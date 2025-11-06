"use client"

import { useEffect, useState, useRef } from "react"
import { Send, Loader2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  text: string
  timestamp: Date
}

const suggestedQuestions = [
  "What skills should I focus on first?",
  "How long will it take to become a Data Analyst?",
  "Can you help me create a learning plan?",
  "What resources do you recommend for Python?",
  "How do I transition to my goal role?",
]

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const assessment = sessionStorage.getItem("userAssessment")
    if (assessment) {
      setUserProfile(JSON.parse(assessment))
    }

    // Initial greeting
    setMessages([
      {
        id: "1",
        type: "assistant",
        text: "Hello! I'm your FutureProof career advisor. I can help you with learning strategies, skill development, and career guidance. What would you like to know?",
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.type === "user" ? "user" : "assistant",
            content: m.text,
          })),
          userProfile,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          text: data.message,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          text: "I'm having trouble connecting. Please try again or ask another question.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-[600px] bg-background border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border bg-primary/5">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Career Advisor</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Get personalized guidance on your learning journey</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary text-foreground rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-secondary text-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions - Show only when no messages besides initial */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-t border-border bg-secondary/5">
          <p className="text-xs text-muted-foreground mb-2">Popular questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestedQuestion(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            placeholder="Ask your question..."
            disabled={loading}
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground disabled:opacity-50"
          />
          <Button onClick={handleSendMessage} disabled={loading || !input.trim()} size="sm" className="rounded-lg">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
