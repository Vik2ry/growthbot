'use client'

import { ScrollArea } from "@/components/ui/scroll-area"

interface LegalContentProps {
  content: string
  title: string
}

export function LegalContent({ content, title }: LegalContentProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#0F1531]">{title}</h2>
      <ScrollArea className="h-[50vh] w-full rounded-md border border-[#0F1531]/20 p-4">
        <div className="space-y-4">
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-sm text-gray-600">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}