"use client"

import { use, useEffect, useState } from "react"
import { StreamChatView } from "@/components/custom/stream-chat"

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  // Properly unwrap params
  const resolvedParams = use(params)

  return <StreamChatView id={resolvedParams.id} />
}

