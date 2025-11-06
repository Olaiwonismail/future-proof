"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Share2, Trash2, Edit2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"

interface PortfolioProject {
  id: string
  title: string
  description: string
  role: string
  skills: string[]
  duration: string
  status: "completed" | "in-progress" | "planned"
  link?: string
  image?: string
  achievements: string[]
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolioProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // Mock projects for demo
      const mockProjects: PortfolioProject[] = [
        {
          id: "1",
          title: "E-commerce Sales Analysis Dashboard",
          description:
            "Built an interactive dashboard analyzing sales trends, customer behavior, and revenue forecasts for a mid-sized e-commerce platform.",
          role: "Data Analyst",
          skills: ["SQL", "Tableau", "Python", "Excel"],
          duration: "6 weeks",
          status: "completed",
          link: "https://example.com/dashboard",
          achievements: [
            "Increased sales insights by 40% for stakeholders",
            "Automated monthly reporting, saving 20 hours/month",
            "Identified key customer segments, improving targeting by 25%",
          ],
        },
        {
          id: "2",
          title: "Customer Churn Prediction Model",
          description:
            "Developed a machine learning model to predict customer churn with 87% accuracy, enabling proactive retention strategies.",
          role: "Machine Learning Engineer",
          skills: ["Python", "Scikit-learn", "Pandas", "Statistics"],
          duration: "8 weeks",
          status: "completed",
          link: "https://github.com/example/churn-model",
          achievements: [
            "Achieved 87% prediction accuracy",
            "Saved company $200K annually through early interventions",
            "Published methodology blog post (500+ views)",
          ],
        },
      ]
      setProjects(mockProjects)
    }
  }, [])

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    localStorage.setItem("portfolioProjects", JSON.stringify(updated))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "in-progress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "planned":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const portfolioStats = {
    totalProjects: projects.length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    skillsCount: new Set(projects.flatMap((p) => p.skills)).size,
    totalHours: projects.length * 6 * 40, // Estimate
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">My Portfolio</h1>
              <p className="text-lg text-muted-foreground">
                Showcase your projects and demonstrate your expertise to potential employers and clients.
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Projects</p>
            <p className="text-3xl font-bold text-foreground">{portfolioStats.totalProjects}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-foreground">{portfolioStats.completedProjects}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Skills Used</p>
            <p className="text-3xl font-bold text-foreground">{portfolioStats.skillsCount}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Hours Invested</p>
            <p className="text-3xl font-bold text-foreground">{portfolioStats.totalHours}</p>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{project.role}</p>
                    <p className="text-foreground mb-4">{project.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 ml-4">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteProject(project.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Duration</p>
                    <p className="text-muted-foreground">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Key Achievements</p>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">
                No projects yet. Start adding your work to build your portfolio.
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Project
              </Button>
            </Card>
          )}
        </div>

        {/* Portfolio Link Section */}
        <Card className="mt-12 p-8 bg-secondary/5 border-primary/10">
          <h2 className="text-xl font-bold mb-4 text-foreground">Share Your Portfolio</h2>
          <p className="text-muted-foreground mb-4">
            Your portfolio link: <span className="font-mono text-primary">futureproof.app/u/username</span>
          </p>
          <Button className="rounded-full">
            <Share2 className="w-4 h-4 mr-2" />
            Copy Portfolio Link
          </Button>
        </Card>
      </div>
    </main>
  )
}
