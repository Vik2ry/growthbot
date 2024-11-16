import { getChatsByUserId } from '@/db/queries';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const session = await auth();

  if (!session || !session.userId) {
    return Response.json('Unauthorized!', { status: 401 });
  }

  const chats = await getChatsByUserId({ id: session.userId! });
  return Response.json(chats);
}
