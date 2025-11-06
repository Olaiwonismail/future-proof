"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import SkillForm from "@/components/skill-form"

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <SkillForm />
      </div>
    </main>
  )
}
