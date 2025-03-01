import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { User } from "@/models/user";
import { Message, IMessage } from "@/models/message";
import { ElevenLabsClient, play } from "elevenlabs";

import { getAuth } from "@clerk/nextjs/server";
import { RESPOND_TO_MESSAGE_SYSTEM_PROMPT } from "@/prompts/systemprompt";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});
// A helper function to pick a Voice ID based on the language.
// You'll need to create or use existing voices in your ElevenLabs dashboard.
// Replace these placeholders with real Voice IDs.

function getVoiceIdByLanguage(lang: string) {
  switch (lang.toLowerCase()) {
    case "english":
      return "aEO01A4wXwd1O8GPgGlF";
    case "hindi":
      return "FFmp1h1BMl0iVHA0JxrI";
    case "tamil":
      return "1XNFRxE3WBB7iI0jnm7p";
  }
}

interface LlmResponse {
  message: string;
  emergency: boolean;
  language: string;
  context: string;
}

// Main function to process JSON and call ElevenLabs
async function generateAudioFromResponse(jsonData: LlmResponse) {
  const { message, language } = jsonData;
  const voiceId = getVoiceIdByLanguage(language);

  const { ElevenLabsClient } = require("elevenlabs");
  const client = new ElevenLabsClient();

  const audioBuffer = await client.textToSpeech.convert(voiceId, {
    text: message,
    model_id: "eleven_multilingual_v2",
    output_format: "mp3_44100_128",
  });

  return audioBuffer;
}

export async function POST(req: NextRequest) {
  const userId = "user_2tgdHjnel0Svpv4XxCKjKrg7L2a";
  // const { userId, getToken } = getAuth(req);

  // return NextResponse.json(
  //   { userId: userId, getToken: getToken },
  //   { status: 200 }
  // );

  try {
    const body = await req.json();
    // here audio is the boolean value, if true then we need to send the audio response
    const { message: message_from_user, thread_id, audio } = body;

    console.log("Received request for patient(patientid): ", userId);
    console.log("Received request for patient(message): ", message_from_user);
    console.log("Received request for patient(threadid): ", thread_id);

    // // Get patient details
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const previousMessages = await Message.find({
      thread: thread_id,
      user: userId,
    }).sort("created_at");

    // this is the
    console.log("this is the previous message: ", previousMessages);

    const message_for_openai = [
      {
        role: "system",
        content: RESPOND_TO_MESSAGE_SYSTEM_PROMPT,
      },
    ];

    const prev_mess = previousMessages
      .map((msg) => {
        const time = new Date(msg.createdAt).toLocaleTimeString();
        return `[${time}] ${msg.message.toUpperCase()}: ${msg.response}`;
      })
      .join("\n");

    const answerResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          // heres the system prompt
          content: RESPOND_TO_MESSAGE_SYSTEM_PROMPT,
        },
        {
          // heres the system message, of the conversation so far
          role: "system",
          content: prev_mess,
        },
        {
          // heres the system message, which user prefers this language
          role: "system",
          content: `user prrefers this language ${userDetails.preferredLanguage}`,
        },
        {
          // heres the user actual message
          role: "user",
          content: message,
        },
      ],
    });

    const response =
      answerResponse.choices[0]?.message?.content || "No response received";

    console.log("Received response from OpenAI: ", response);

    // @ts-ignore
    const { emergency, message, language, context } =
      answerResponse.choices[0]?.message?.content || {};
    console.log("Emergency status: ", emergency);
    console.log("Response language: ", language);
    console.log("Context: ", context);
    console.log("Response message: ", message);

    if (audio) {
      // here we need to convert the text to audio
      // and send the audio response
      const audio = await generateAudioFromResponse(answerResponse.choices[0]?.message?.content);

      return NextResponse.json({ a }, { status: 200 });
    }

    await Message.create({
      thread: thread_id,
      user: userId,
      message,
      response,
    });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
