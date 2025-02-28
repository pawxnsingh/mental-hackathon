import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/app/models/user';

// POST handler: creates a new chat thread
export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title } = body;
    
    // Create a new chat thread (adjust the API according to your ORM)
    const chatThread = await Thread.create({
      data: { title }
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
  const threadId = searchParams.get('thread_id');

  if (threadId) {
    try {
      // Retrieve messages for the specific thread
      const messages = await db.chatMessage.findMany({
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
        { error: 'Thread not found or no messages' },
        { status: 404 }
      );
    }
  }

  // If no thread_id is provided, return all chat threads
  const threads = await db.chatThread.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
    },
  });
  return NextResponse.json(threads);
}
