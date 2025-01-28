import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { auth } from "@clerk/nextjs/server";

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!, // Server-side API key
  process.env.STREAM_API_SECRET! // Server-side API secret
);

export async function POST() {
  try {
    // Authenticate the user via Clerk
    const { userId } = auth();
    const user = await fetch("https://api.clerk.dev/v1/users/me", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_API_KEY}`,
      },
    }).then((res) => res.json());
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate a Stream token
    const token = serverClient.createToken(userId);

    // Upsert the user into Stream (optional, but recommended)
    await serverClient.upsertUser({
      id: userId,
      name: user?.firstName || "Anonymous",
      image: user?.profileImageUrl || null,
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating Stream token:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
