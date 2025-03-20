'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, usePathname } from 'next/navigation';
import {
  StreamChat,
  ChannelFilters,
  ChannelOptions,
  ChannelSort,
  UserResponse,
} from 'stream-chat';
import {
  DefaultStreamChatGenerics,
  useCreateChatClient,
} from 'stream-chat-react';
import { createToken } from '@/lib/actions';

interface ChatClientData {
  client: StreamChat | null;
  userData: UserResponse<DefaultStreamChatGenerics> | null;
  filters: ChannelFilters<DefaultStreamChatGenerics> | null;
  sort: ChannelSort<DefaultStreamChatGenerics>;
  options: ChannelOptions;
}

// ✅ Convert UserData to UserResponse format
function mapUserDataToUserResponse(
  userData: any
): UserResponse<DefaultStreamChatGenerics> {
  return {
    id: userData.id,
    name:
      `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
      userData.username ||
      'Unknown',
    username: userData.username || '',
    image: userData.imageUrl || '',
    role: 'user',
    banned: false,
    online: false,
    teams: [],
  };
}

export function useChatClient(): ChatClientData {
  const { id } = useParams();
  const pathname = usePathname();
  const isFindDisciplerChat =
    pathname.startsWith('/find-discipler') && id !== undefined;

  const [userData, setUserData] =
    useState<UserResponse<DefaultStreamChatGenerics> | null>(null);

  useEffect(() => {
    if (!isFindDisciplerChat) return;

    async function fetchUserData() {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUserData(mapUserDataToUserResponse(data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [id, isFindDisciplerChat]);

  const tokenProvider = useCallback(async () => {
    if (!userData) return '';
    return await createToken(userData.id);
  }, [userData]);
  console.log({ userData });

  // ✅ Ensure `useCreateChatClient` is always called
  const client = useCreateChatClient({
    userData: userData ?? { id: 'temp_user' }, // ✅ Provide fallback data
    tokenOrProvider: userData ? tokenProvider : async () => '',
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  });
  
  const filters = userData
    ? { type: 'messaging', members: { $in: [userData.id] } }
    : { type: 'messaging' }; // Fallback filters

  const sort: ChannelSort<DefaultStreamChatGenerics> = { last_message_at: -1 };
  const options = { limit: 10 };

  return {
    client,
    userData,
    filters,
    sort,
    options,
  };
}
