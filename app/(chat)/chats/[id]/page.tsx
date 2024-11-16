import { CoreMessage } from 'ai';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // Use redirect instead of notFound

import { DEFAULT_MODEL_NAME, models } from '@/ai/models';
import { Chat as PreviewChat } from '@/components/custom/chat';
import { getChatById, getMessagesByChatId } from '@/db/queries';
import { convertToUIMessages } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch the chat data
  const chat = await getChatById({ id });
  if (!chat) {
    redirect('/chats'); // Redirect to /chats if the chat is not found
  }

  // Authenticate the user
  const session = await auth();
  if (!session || !session.userId || session.userId !== chat.userId) {
    redirect('/chats'); // Redirect to /chats if the user is not authorized
  }

  // Fetch messages related to the chat
  const messagesFromDb = await getMessagesByChatId({ id });

  // Read cookies and determine the selected model ID
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  // Render the chat component with the fetched data
  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={selectedModelId}
    />
  );
}
