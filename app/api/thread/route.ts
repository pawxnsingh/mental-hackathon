import { NextResponse } from "next/server";
import { Thread } from "@/models/thread";
import { Message } from "@/models/message";

// POST handler: creates a new chat thread
export async function POST(request: Request) {
  // here we have to add the user id
  const userId = "user_2tgdHjnel0Svpv4XxCKjKrg7L2a";

  try {
    const body = await request.json();
    const { title } = body;

    // Create a new chat thread (adjust the API according to your ORM)
    const chatThread = await Thread.create({
      data: { title, user: userId },
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
  const user_id = "user_2tgdHjnel0Svpv4XxCKjKrg7L2a";

  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("thread_id");

  if (threadId) {
    try {
      // Retrieve messages for the specific thread
      const messages = await Message.find({
        where: { thread: threadId, user: user_id },
        select: {
          id: true,
          thread: true,
          user: true,
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
  const threads = await Thread.find(
    {
      user: user_id,
    },
    {
      select: {
        id: true,
        title: true,
        created_at: true,
      },
    }
  );
  return NextResponse.json(threads);
}

export async function DELETE(request: Request) {
  const user_id = "user_2tgdHjnel0Svpv4XxCKjKrg7L2a";

  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("thread_id");

    if (!threadId) {
      return NextResponse.json(
        { error: "Thread ID is required" },
        { status: 400 }
      );
    }

    const thread = await Thread.findByIdAndDelete({
      where: { id: threadId, user: user_id },
    });

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
