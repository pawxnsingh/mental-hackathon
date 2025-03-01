import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { User } from "@/models/user";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  await connectDB();

  // Get Clerk userId from auth
  const userId = "user_2tgQCIdgAtR0pZP8QjCVkMFe6LG"
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: Please sign in." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { preferredLanguage, mentalHealthGoals, gender, role } = body;

    // Get user email and name from the request body
    // These should be passed from the client (your onboarding component)
    const name = body.name;
    const email = body.email;

    // Check if user already exists in MongoDB
    let user = await User.findOne({ clerkUserId: userId });

    if (user) {
      // Update existing user
      user.preferredLanguage = preferredLanguage;
      user.mentalHealthGoals = mentalHealthGoals || [];
      user.gender = gender;
      user.role = role;
      user.onboardingComplete = true;

      await user.save();
    } else {
      // Create new user
      // Using a placeholder date for DOB since it's required in your schema
      // You might want to add a DOB field to your onboarding form
      const currentDate = new Date();

      user = await User.create({
        clerkUserId: userId,
        name,
        email,
        preferredLanguage,
        mentalHealthGoals: mentalHealthGoals || [],
        gender,
        role,
        onboardingComplete: true,
        dob: currentDate, // Add DOB field to your onboarding form or make it optional in schema
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.error("Error in onboarding API:", error);
    return NextResponse.json(
      { error: `Error updating onboarding: ${error.message}` },
      { status: 500 }
    );
  }
}
