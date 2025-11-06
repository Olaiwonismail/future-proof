"use client"

import Link from "next/link"
import { ArrowLeft, Flame, TrendingUp, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"

const roles = [
  {
    title: "Data Analyst",
    demand: "High Demand",
    demand_color: "bg-green-100 text-green-800",
    salary: "₦800K - ₦1.5M/month",
    skills: ["SQL", "Python", "Excel", "Tableau"],
    description:
      "Transform raw data into actionable insights. Work with databases, spreadsheets, and visualization tools.",
    icon: TrendingUp,
  },
  {
    title: "Machine Learning Engineer",
    demand: "Emerging",
    demand_color: "bg-blue-100 text-blue-800",
    salary: "₦1.2M - ₦2.5M/month",
    skills: ["Python", "TensorFlow", "Statistics", "Problem Solving"],
    description: "Build and deploy ML models that power intelligent features. Requires strong math and coding skills.",
    icon: Flame,
  },
  {
    title: "Product Manager",
    demand: "High Demand",
    demand_color: "bg-green-100 text-green-800",
    salary: "₦1M - ₦2M/month",
    skills: ["Communication", "Leadership", "Analytics", "Strategy"],
    description: "Guide product direction, work with cross-functional teams, and deliver user-centric solutions.",
    icon: Zap,
  },
  {
    title: "AI Prompt Engineer",
    demand: "Emerging",
    demand_color: "bg-purple-100 text-purple-800",
    salary: "₦600K - ₦1.2M/month",
    skills: ["Communication", "AI Tools", "Creativity", "Problem Solving"],
    description: "Craft prompts and workflows to automate knowledge tasks with AI. No coding required initially.",
    icon: Zap,
  },
]

export default function RolesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Career Roles</h1>
          <p className="text-lg text-muted-foreground">
            Explore emerging and in-demand roles perfect for Nigerian youth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, idx) => {
            const IconComponent = role.icon
            return (
              <Card key={idx} className="p-8 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <Badge className={`${role.demand_color} border-0`}>{role.demand}</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                <p className="text-sm font-medium text-accent mb-4">{role.salary}</p>
                <p className="text-muted-foreground mb-6 flex-1">{role.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {role.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Link href={`/roadmap/${role.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Button className="w-full rounded-full">View Roadmap</Button>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
