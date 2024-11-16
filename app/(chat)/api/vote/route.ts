import { getVotesByChatId, voteMessage } from '@/db/queries';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new Response('chatId is required', { status: 400 });
  }

  try {
    const { userId } = getAuth(request);
    console.log('User ID from Clerk:', userId);

    if (!userId) {
      console.log('No user ID found, returning 401');
      return new Response('Unauthorized', { status: 401 });
    }

    const votes = await getVotesByChatId({ id: chatId });
    return Response.json(votes, { status: 200 });
  } catch (error) {
    console.error('Error in GET request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: 'up' | 'down' } =
    await request.json();

  if (!chatId || !messageId || !type) {
    return new Response('messageId and type are required', { status: 400 });
  }

  const { userId } = getAuth(request);

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  await voteMessage({
    chatId,
    messageId,
    type: type,
  });

  return new Response('Message voted', { status: 200 });
}
