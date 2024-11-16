import { CoreMessage } from 'ai';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { DEFAULT_MODEL_NAME, models } from '@/ai/models';
import { Chat as PreviewChat } from '@/components/custom/chat';
import { getChatById, getMessagesByChatId } from '@/db/queries';
import { convertToUIMessages } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });  

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (!session || !session.userId) {
    return notFound();
  }

  if (session.userId !== chat.userId) {
    return notFound();
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={convertToUIMessages(messagesFromDb)}
      selectedModelId={selectedModelId}
    />
  );
}
