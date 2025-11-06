"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Star, MessageSquare, MapPin, Trophy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"

interface Mentor {
  id: string
  name: string
  title: string
  expertise: string[]
  bio: string
  rating: number
  reviews: number
  location: string
  hourlyRate: number
  availability: string
  image?: string
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "1",
      name: "Priya Sharma",
      title: "Senior Data Analyst",
      expertise: ["SQL", "Tableau", "Python", "Analytics"],
      bio: "Former data lead at major fintech with 7+ years experience. Passionate about helping others transition to data careers.",
      rating: 4.9,
      reviews: 47,
      location: "Remote",
      hourlyRate: 2500,
      availability: "Weekends & Evenings",
      image: "/female-professional.jpg",
    },
    {
      id: "2",
      name: "Akira Okonkwo",
      title: "ML Engineer at Tech Startup",
      expertise: ["Python", "TensorFlow", "PyTorch", "MLOps"],
      bio: "Building ML systems at scale. 5 years in production ML. Mentoring 10+ engineers on their ML journey.",
      rating: 4.8,
      reviews: 32,
      location: "Lagos, Nigeria",
      hourlyRate: 3000,
      availability: "Flexible",
      image: "/male-professional.jpg",
    },
    {
      id: "3",
      name: "Chioma Adeyemi",
      title: "Product Manager",
      expertise: ["Product Strategy", "OKRs", "User Research", "Analytics"],
      bio: "Led product at Series B startup from 0 to 100K users. Expert in user-centric product development.",
      rating: 4.7,
      reviews: 25,
      location: "Remote",
      hourlyRate: 4000,
      availability: "Weekday mornings",
      image: "/female-executive.jpg",
    },
  ])

  const [myMentors, setMyMentors] = useState<string[]>([])

  const requestMentorship = (mentorId: string) => {
    setMyMentors((prev) => [...prev, mentorId])
  }

  const isMentorConnected = (mentorId: string) => myMentors.includes(mentorId)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Find Your Mentor</h1>
          <p className="text-lg text-muted-foreground">
            Connect with experienced professionals who can guide your career journey and help you achieve your goals.
          </p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
            <TabsTrigger value="my-mentors">My Mentors ({myMentors.length})</TabsTrigger>
          </TabsList>

          {/* Browse Mentors Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="p-4 bg-secondary/5 border-none">
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  Data & Analytics
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  Machine Learning
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  Product Management
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  Under ₦3000/hr
                </Badge>
              </div>
            </Card>

            {/* Mentors Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                      {mentor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-foreground">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-foreground">Expertise:</span>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.expertise.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{mentor.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-foreground">₦{mentor.hourlyRate}/hr</span>
                      <span className="text-muted-foreground text-xs">{mentor.availability}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => requestMentorship(mentor.id)}
                      disabled={isMentorConnected(mentor.id)}
                      className="flex-1 rounded-full"
                    >
                      {isMentorConnected(mentor.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Connected
                        </>
                      ) : (
                        "Request Mentorship"
                      )}
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Mentors Tab */}
          <TabsContent value="my-mentors">
            {myMentors.length > 0 ? (
              <div className="space-y-4">
                {mentors
                  .filter((m) => myMentors.includes(m.id))
                  .map((mentor) => (
                    <Card key={mentor.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center text-white font-bold">
                            {mentor.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground">{mentor.name}</h3>
                            <p className="text-sm text-muted-foreground">{mentor.title}</p>
                            <p className="text-sm text-muted-foreground mt-2">{mentor.bio}</p>
                          </div>
                        </div>
                        <Button className="rounded-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">You haven't connected with any mentors yet.</p>
                <Button
                  onClick={() => {
                    const browserTab = document.querySelector('[value="browse"]') as HTMLElement
                    browserTab?.click()
                  }}
                >
                  Browse Available Mentors
                </Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Benefits Section */}
        <Card className="mt-12 p-8 bg-secondary/5 border-primary/10">
          <h2 className="text-xl font-bold mb-6 text-foreground">Why Get a Mentor?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Personalized Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Get advice tailored to your goals, skills, and career stage.
              </p>
            </div>
            <div>
              <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Accelerate Growth</h3>
              <p className="text-sm text-muted-foreground">Learn from someone's experience and skip common pitfalls.</p>
            </div>
            <div>
              <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-semibold text-foreground mb-2">Build Connections</h3>
              <p className="text-sm text-muted-foreground">Expand your network and open doors to new opportunities.</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
