import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { User } from "@/models/user";
import { Message, IMessage } from "@/models/message";
import { RESPOND_TO_MESSAGE_SYSTEM_PROMPT } from "@/prompts/systemprompt";

const openai = new OpenAI({
  apiKey: "",
});

const generateSystemMessage = (previousMessages: IMessage[]) => {
  const context = previousMessages
    .map((msg) => {
      const time = new Date(msg.createdAt).toLocaleTimeString();
      return `[${time}] ${msg.message.toUpperCase()}: ${msg.response}`;
    })
    .join("\n");

  const systemMessage = {
    role: "system",
    content: `Here is the conversation so far:\n${context}`,
  };

  return systemMessage;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, user_id, thread_id } = body;

    console.log("Received request for patient(patientid): ", user_id);
    console.log("Received request for patient(message): ", message);
    console.log("Received request for patient(threadid): ", thread_id);

    // // Get patient details
    const userDetails = await User.findById(user_id);
    if (!userDetails) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const previousMessages = await Message.find({
      thread: thread_id,
      user: user_id,
    }).sort("created_at");

    // this is the
    console.log("this is the previous message: ", previousMessages);

    const message_for_openai = [
      {
        role: "system",
        content: RESPOND_TO_MESSAGE_SYSTEM_PROMPT,
      },
    ];

    message_for_openai.


    const answerResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: RESPOND_TO_MESSAGE_SYSTEM_PROMPT },
        { role: "development", content: "" },
        {
          role: "user",
          content: "what is sun",
        },
      ],
    });

    const response =
      answerResponse.choices[0]?.message?.content || "No response received";

    // await Message.create({
    //   thread: thread_id,
    //   user: user_id,
    //   message,
    //   response,
    // });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
