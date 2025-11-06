"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, BookOpen, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import RoleCard from "@/components/role-card"
import ChatBot from "@/components/chatbot"

const featuredRoles = [
  {
    title: "Data Analyst",
    match: "High match",
    description: "Turn raw data into insights using SQL, spreadsheets, and visualization tools.",
    badge: "High Match",
  },
  {
    title: "Machine Learning Engineer",
    match: "Great fit",
    description: "Build, train, and deploy ML models to power intelligent features.",
    badge: "Great Fit",
  },
  {
    title: "Product Manager",
    match: "Good option",
    description: "Guide product strategy and work with cross-functional teams.",
    badge: "Good Option",
  },
]

export default function Home() {
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground text-balance">
            Find your Future-Proof Career Path.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered guidance from skills to real outcomes.
          </p>
          <Link href="/assessment">
            <Button size="lg" className="rounded-full text-lg">
              <ArrowRight className="w-5 h-5 mr-2" />
              Start My Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-foreground">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
              <p className="text-muted-foreground">
                Comprehensive evaluation of your abilities, interests, and learning style.
              </p>
            </Card>
            <Card className="p-6">
              <BookOpen className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn & Earn</h3>
              <p className="text-muted-foreground">
                Gain real-world experience and income through micro-gigs while learning.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
              <p className="text-muted-foreground">Connect with mentors for guidance and portfolio verification.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommended Roles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Recommended Roles</h2>
            <p className="text-lg text-muted-foreground">
              Based on skills and interests. Explore a roadmap for each role.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredRoles.map((role, idx) => (
              <RoleCard key={idx} {...role} />
            ))}
          </div>
          <p className="text-muted-foreground">
            Want different options? Adjust your skills in the form or ask the chatbot.
          </p>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="flex items-center gap-3 text-primary hover:underline font-medium"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">💬</div>
            Have questions? Ask the chatbot for guidance.
          </button>
          {showChatbot && <ChatBot />}
        </div>
      </section>
    </main>
  )
}
