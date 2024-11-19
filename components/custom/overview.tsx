import { motion } from 'framer-motion';
import Link from 'next/link';
import { MultimodalInput } from './multimodal-input';
import { Attachment, ChatRequestOptions, CreateMessage, Message } from 'ai';
import { Dispatch, SetStateAction } from 'react';

export const Overview = ({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  chatId: string;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  className?: string;
}) => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl min-w-full min-h-full mx-auto flex flex-col justify-center items-center text-center"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <h1 className="text-3xl font-semibold text-black mb-4">
        Welcome to GrowthBot
      </h1>
      <p className="text-base text-gray-400 max-w-md">
        Welcome, I'm GrowthBot! Congratulations, you have taken commendable
        steps towards your discipleship and spiritual growth.
      </p>
      <form className="flex items-end mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultimodalInput
            chatId={chatId}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={append}
          />
        </form>
    </motion.div>
  );
};
