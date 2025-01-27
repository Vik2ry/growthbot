import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { StreamChat } from "@/components/custom/stream-chat"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  // Authenticate the user
  const session = await auth()
  if (!session || !session.userId) {
    redirect("/chats")
  }

  // Render the Stream chat component
  return <StreamChat id={id} />
}
