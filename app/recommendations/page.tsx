"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import RoleCard from "@/components/role-card"

interface Recommendation {
  title: string
  badge: string
  description: string
  whyGoodFit: string
  nextSteps: string
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const assessment = sessionStorage.getItem("userAssessment")
        if (!assessment) {
          setError("No assessment data found. Please complete the assessment first.")
          setLoading(false)
          return
        }

        const assessmentData = JSON.parse(assessment)

        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assessmentData),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations")
        }

        const data = await response.json()
        setRecommendations(data.recommendations)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/assessment" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Recommended Roles</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered recommendations based on your skills, interests, and experience.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Generating personalized recommendations...</p>
          </div>
        ) : error ? (
          <Card className="p-8 bg-destructive/5 border-destructive/20">
            <p className="text-destructive">{error}</p>
            <Link href="/assessment" className="text-primary hover:underline mt-4 block">
              Return to assessment
            </Link>
          </Card>
        ) : recommendations.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recommendations.map((role, idx) => (
                <RoleCard key={idx} {...role} />
              ))}
            </div>

            {/* Additional Insights Section */}
            <Card className="p-8 bg-secondary/5 border-none space-y-4">
              <h2 className="text-xl font-bold text-foreground">Next Steps</h2>
              <p className="text-muted-foreground">
                Explore each role's roadmap to see the skills you'll need to develop and resources for learning. You can
                also ask our chatbot for personalized guidance on your career journey.
              </p>
              <Link href="/#chatbot" className="text-primary hover:underline inline-block">
                Chat with our AI advisor
              </Link>
            </Card>
          </>
        ) : (
          <Card className="p-8 bg-secondary/5 border-none">
            <p className="text-muted-foreground">No recommendations available. Please try the assessment again.</p>
          </Card>
        )}
      </div>
    </main>
  )
}
