"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatBot from "./chatbot"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="relative">
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 z-10 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
            <ChatBot />
          </div>
        </div>
      )}

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 rounded-full shadow-lg z-50 w-14 h-14"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </>
  )
}
