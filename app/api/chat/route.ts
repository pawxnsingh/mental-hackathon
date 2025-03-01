import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { User } from "@/models/user";
import { Message, IMessage } from "@/models/message";
import { getAuth } from "@clerk/nextjs/server";
import { RESPOND_TO_MESSAGE_SYSTEM_PROMPT } from "@/prompts/systemprompt";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1",
});

const generateSystemMessage = (previousMessages: IMessage[]) => {
  const context = previousMessages
    .map((msg) => {
      const time = new Date(msg.createdAt).toLocaleTimeString();
      return `[${time}] ${msg.message.toUpperCase()}: ${msg.response}`;
    })
    .join("\n");

  const systemMessage = {
    role: "developer",
    content: `Here is the conversation so far:\n${context}`,
  };

  return systemMessage;
};

export async function POST(req: NextRequest) {
  const userId = "user_2tgdHjnel0Svpv4XxCKjKrg7L2a";
  // const { userId, getToken } = getAuth(req);

  // return NextResponse.json(
  //   { userId: userId, getToken: getToken },
  //   { status: 200 }
  // );

  try {
    const body = await req.json();
    const { message, thread_id } = body;

    console.log("Received request for patient(patientid): ", userId);
    console.log("Received request for patient(message): ", message);
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

    const context = previousMessages
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
          content: context,
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
        }
      ],
    });

    const response =
      answerResponse.choices[0]?.message?.content || "No response received";

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
