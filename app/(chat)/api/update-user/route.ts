import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {}, // Add fields to update if needed
      create: { id: userId },
    });

    return NextResponse.json({ message: 'User processed successfully' });
  } catch (error) {
    console.error('Error processing user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
