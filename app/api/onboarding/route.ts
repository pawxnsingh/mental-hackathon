// /app/api/onboarding/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { User } from "@/models/user";

export async function POST(request: NextRequest) {
  // Use Clerk's server-side auth helper to get the userId
  // this will give me the clerk user-id
  // and extracted from the user
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { preferredLanguage, mentalHealthGoals } = body;

    // Validate required fields if needed
    if (!preferredLanguage) {
      return NextResponse.json(
        { error: "Preferred language is required." },
        { status: 400 }
      );
    }

    // Update the user record in your database (using clerkUserId field)
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: userId },
      {
        preferredLanguage,
        mentalHealthGoals: mentalHealthGoals || [],
        onboardingComplete: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error updating onboarding: ${error.message}` },
      { status: 500 }
    );
  }
}
