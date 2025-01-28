import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export const GET = async () => {
  try {
    const userList = await clerkClient.users.getUserList();
    return NextResponse.json({ success: true, data: userList });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 });
  }
};
