"use client"

import { StreamChatView } from "@/components/stream-chat"
import { use, useEffect, useState } from "react"

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  // Properly unwrap params
  const resolvedParams = use(params)

  return <StreamChatView id={resolvedParams.id} />
}

