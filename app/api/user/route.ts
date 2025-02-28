import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Message } from "@/models/message";

// Helper function to generate a response from an open-source LLM.
// In this example, we use the HuggingFace Inference API with the BLOOM model.
async function generateResponse(prompt: string): Promise<string> {
  const apiUrl = "https://api-inference.huggingface.co/models/bigscience/bloom";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Make sure to set your HuggingFace API key in your environment variables
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
    },
    body: JSON.stringify({ inputs: prompt }),
  });
  
  const result = await response.json();
   
  // Assuming the API returns an array with an object containing generated_text.
  if (Array.isArray(result) && result[0]?.generated_text) {
    return result[0].generated_text;
  }
  
  return "I'm sorry, I couldn't generate a response.";
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { thread, user, message, messageType } = body;
    
    // Validate required fields
    if (!thread || !user || !message) {
      return NextResponse.json(
        { error: "Thread, user, and message fields are required." },
        { status: 400 }
      );
    }
    
    // Generate a response using the LLM
    const generatedResponse = await generateResponse(message);
    
    // Create a new message document containing the user message and assistant's response.
    // Here, we set `sender` as "user" for the primary message.
    // The assistant response is stored in the "response" field.
    const newMessage = new Message({
      thread,
      user,
      sender: "user",
      message,
      response: generatedResponse,
      messageType: messageType || "text",
    });
    
    await newMessage.save();
    
    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error generating chat response: ${error.message}` },
      { status: 500 }
    );
  }
}
