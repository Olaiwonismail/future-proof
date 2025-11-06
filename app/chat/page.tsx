"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navigation from "@/components/navigation"
import ChatBot from "@/components/chatbot"

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Career Advisor Chat</h1>
          <p className="text-lg text-muted-foreground">
            Ask our AI advisor any questions about your learning journey, career path, or skill development.
          </p>
        </div>

        <ChatBot />
      </div>
    </main>
  )
}
