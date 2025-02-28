import { NextResponse } from "next/server";
import { Thread } from "@/models/thread";
import { Message } from "@/models/message";

// POST handler: creates a new chat thread
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    // Create a new chat thread (adjust the API according to your ORM)
    const chatThread = await Thread.create({
      data: { title },
    });

    return NextResponse.json(
      { id: chatThread.id, title: chatThread.title },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error creating thread: ${error.message}` },
      { status: 500 }
    );
  }
}

// GET handler: retrieves either messages for a thread (if thread_id is provided)
// or all chat threads if no thread_id is given.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("thread_id");

  if (threadId) {
    try {
      // Retrieve messages for the specific thread
      const messages = await Message.find({
        where: { thread_id: Number(threadId) },
        select: {
          id: true,
          thread_id: true,
          patient_id: true,
          message: true,
          response: true,
          created_at: true,
        },
      });
      return NextResponse.json(messages);
    } catch (error: any) {
      return NextResponse.json(
        { error: "Thread not found or no messages" },
        { status: 404 }
      );
    }
  }

  // If no thread_id is provided, return all chat threads
  const threads = await Thread.find({
    select: {
      id: true,
      title: true,
      created_at: true,
    },
  });
  return NextResponse.json(threads);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("thread_id");

    if (!threadId) {
      return NextResponse.json(
        { error: "Thread ID is required" },
        { status: 400 }
      );
    }

    const thread = await Thread.findByIdAndDelete(threadId);

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    // Remove all messages related to the thread
    await Message.deleteMany({ thread: threadId });

    return NextResponse.json({
      message: "Thread and related messages deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error deleting thread" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { threadId, newTitle } = body;

    if (!threadId || !newTitle) {
      return NextResponse.json(
        { error: "Thread ID and new title are required" },
        { status: 400 }
      );
    }

    const updatedThread = await Thread.findByIdAndUpdate(
      threadId,
      { title: newTitle },
      { new: true }
    );

    if (!updatedThread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    return NextResponse.json(updatedThread);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error updating thread" },
      { status: 500 }
    );
  }
}
