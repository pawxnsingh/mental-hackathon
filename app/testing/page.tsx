import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";

export default async function Home() {
  await connectDB(); // Connect to MongoDB

  const { sessionId } = await auth();
  const user = await currentUser();
  console.log(sessionId);

  if (!user) {
    return <p>You are not logged in</p>;
  }

  //   Get user details from MongoDB using Clerk ID
  let dbUser = await User.findOne({ username: user?.firstName });

  // If user does not exist in DB, create it
  if (!dbUser) {
    dbUser = await User.create({
      clerkId: user?.id,
      username: user?.username || "NoUsername",
      email: user?.emailAddresses[0].emailAddress,
    });
  }

  return (
    <div>
      <h1>Welcome {user?.firstName}</h1>
      <p>Email</p>
    </div>
  );
}
