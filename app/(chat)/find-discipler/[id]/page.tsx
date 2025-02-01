"use client"

import { StreamChatView } from "@/components/stream-chat"
import { use, useEffect, useState } from "react"

export interface UserData {
  id: string
  username?: string
  imageUrl?: string
  firstName?: string
  lastName?: string
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  // Properly unwrap params
  const resolvedParams = use(params);
  const [userData, setUserData] = useState<UserData>();
 useEffect(() => {
    async function fetchUserData() {
      if (!resolvedParams.id) return;
      try {
        const response = await fetch(`/api/users/${resolvedParams.id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, [resolvedParams.id]);
  return userData ? <StreamChatView id={resolvedParams.id} userData={userData} /> : <div>Loading...</div>
}

