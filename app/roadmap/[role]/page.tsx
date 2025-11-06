"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, BookOpen, Zap, CheckCircle2, Circle, Clock, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"

interface StageDetail {
  title: string
  duration: string
  icon: React.ReactNode
  description: string
  items: string[]
  resources: {
    title: string
    type: string
    time: string
  }[]
  milestones: string[]
}

const roleRoadmaps: Record<string, { title: string; stages: StageDetail[] }> = {
  "data-analyst": {
    title: "Data Analyst",
    stages: [
      {
        title: "Stage 1: Foundation & Tools",
        duration: "2-4 weeks",
        icon: <BookOpen className="w-6 h-6" />,
        description: "Master fundamental concepts and set up essential tools for data analysis.",
        items: [
          "Learn SQL basics: SELECT, WHERE, JOIN, GROUP BY queries",
          "Setup: Excel, Spreadsheets, and basic Python environment",
          "Understand data types, cleaning, and basic statistics",
        ],
        resources: [
          { title: "SQL Tutorial for Beginners", type: "Video", time: "6 hours" },
          { title: "Excel Data Analysis Masterclass", type: "Course", time: "8 hours" },
          { title: "Python Fundamentals", type: "Interactive", time: "10 hours" },
        ],
        milestones: [
          "Write 5 SQL queries from scratch",
          "Create a pivot table analysis",
          "Build a data cleaning script in Python",
        ],
      },
      {
        title: "Stage 2: Analysis & Visualization",
        duration: "4-8 weeks",
        icon: <Zap className="w-6 h-6" />,
        description: "Learn to analyze data and create compelling visualizations.",
        items: [
          "Advanced SQL: CTEs, window functions, performance optimization",
          "Data visualization with Tableau or Power BI",
          "Statistical analysis and hypothesis testing",
        ],
        resources: [
          { title: "Advanced SQL Techniques", type: "Course", time: "12 hours" },
          { title: "Tableau Data Visualization", type: "Course", time: "10 hours" },
          { title: "Statistics for Data Analysis", type: "Video", time: "8 hours" },
        ],
        milestones: [
          "Build 3 interactive dashboards",
          "Complete statistical analysis project",
          "Create data story with visualizations",
        ],
      },
      {
        title: "Stage 3: Real-World Projects & Portfolio",
        duration: "3-6 weeks",
        icon: <Award className="w-6 h-6" />,
        description: "Build portfolio projects and land your first data analyst role.",
        items: [
          "End-to-end project: raw data to insights",
          "Document methodology and findings",
          "Build professional portfolio with 2-3 projects",
        ],
        resources: [
          { title: "Portfolio Project Guide", type: "Guide", time: "4 hours" },
          { title: "Public Datasets for Practice", type: "Resources", time: "Ongoing" },
          { title: "Interview Prep for Analysts", type: "Course", time: "6 hours" },
        ],
        milestones: [
          "Complete 1 end-to-end analysis project",
          "Document and present findings",
          "Launch portfolio website",
        ],
      },
    ],
  },
  "machine-learning-engineer": {
    title: "Machine Learning Engineer",
    stages: [
      {
        title: "Stage 1: ML Foundations",
        duration: "3-5 weeks",
        icon: <BookOpen className="w-6 h-6" />,
        description: "Build strong foundations in machine learning concepts and Python.",
        items: [
          "Python: NumPy, Pandas, Scikit-learn libraries",
          "ML fundamentals: supervised, unsupervised learning",
          "Feature engineering and data preprocessing",
        ],
        resources: [
          { title: "Python for Data Science", type: "Course", time: "15 hours" },
          { title: "ML Algorithms Explained", type: "Video", time: "12 hours" },
          { title: "Scikit-learn Mastery", type: "Interactive", time: "10 hours" },
        ],
        milestones: [
          "Build 3 classification models",
          "Master feature engineering techniques",
          "Evaluate models with appropriate metrics",
        ],
      },
      {
        title: "Stage 2: Advanced ML & Deep Learning",
        duration: "6-10 weeks",
        icon: <Zap className="w-6 h-6" />,
        description: "Explore neural networks and advanced ML techniques.",
        items: [
          "Deep learning: TensorFlow, PyTorch basics",
          "Neural network architectures: CNNs, RNNs",
          "Model training, validation, and hyperparameter tuning",
        ],
        resources: [
          { title: "Deep Learning Specialization", type: "Course", time: "24 hours" },
          { title: "TensorFlow & PyTorch Guide", type: "Documentation", time: "8 hours" },
          { title: "Neural Networks in Practice", type: "Project", time: "Ongoing" },
        ],
        milestones: ["Train a CNN on image data", "Build an RNN for sequence prediction", "Optimize model performance"],
      },
      {
        title: "Stage 3: Production & Deployment",
        duration: "4-6 weeks",
        icon: <Award className="w-6 h-6" />,
        description: "Deploy ML models and build production systems.",
        items: [
          "Model deployment with Docker, Kubernetes",
          "MLOps: monitoring, versioning, automation",
          "Build end-to-end ML pipeline",
        ],
        resources: [
          { title: "MLOps Fundamentals", type: "Course", time: "10 hours" },
          { title: "Model Deployment Guide", type: "Guide", time: "6 hours" },
          { title: "Production ML Best Practices", type: "Video", time: "8 hours" },
        ],
        milestones: [
          "Deploy model to cloud (AWS/GCP)",
          "Build complete ML pipeline",
          "Create production-ready project",
        ],
      },
    ],
  },
  "product-manager": {
    title: "Product Manager",
    stages: [
      {
        title: "Stage 1: PM Fundamentals",
        duration: "2-4 weeks",
        icon: <BookOpen className="w-6 h-6" />,
        description: "Understand core PM concepts, tools, and mindset.",
        items: [
          "Product lifecycle and strategy framework",
          "User research and customer discovery",
          "Roadmapping and prioritization techniques",
        ],
        resources: [
          { title: "Inspired: The Product Manager Handbook", type: "Book", time: "10 hours" },
          { title: "Product Strategy Masterclass", type: "Course", time: "8 hours" },
          { title: "User Research Methods", type: "Video", time: "6 hours" },
        ],
        milestones: ["Conduct 3 user interviews", "Create product vision statement", "Build initial roadmap"],
      },
      {
        title: "Stage 2: Building & Analytics",
        duration: "4-8 weeks",
        icon: <Zap className="w-6 h-6" />,
        description: "Learn product execution and data-driven decision making.",
        items: [
          "Working with engineering and design teams",
          "Metrics, analytics, and data interpretation",
          "Agile, OKRs, and project management",
        ],
        resources: [
          { title: "Product Analytics Crash Course", type: "Course", time: "10 hours" },
          { title: "Agile Product Development", type: "Course", time: "8 hours" },
          { title: "SQL for PMs", type: "Tutorial", time: "6 hours" },
        ],
        milestones: ["Launch a feature end-to-end", "Define and track OKRs", "Analyze user data and iterate"],
      },
      {
        title: "Stage 3: Advanced Skills & Leadership",
        duration: "6-12 weeks",
        icon: <Award className="w-6 h-6" />,
        description: "Develop advanced PM skills and thought leadership.",
        items: [
          "Go-to-market strategy and growth",
          "Influencing without authority",
          "Building and managing product teams",
        ],
        resources: [
          { title: "Advanced Product Strategy", type: "Course", time: "12 hours" },
          { title: "GTM Framework Masterclass", type: "Workshop", time: "6 hours" },
          { title: "PM Leadership Skills", type: "Mentorship", time: "Ongoing" },
        ],
        milestones: [
          "Develop comprehensive GTM strategy",
          "Lead cross-functional team project",
          "Present to stakeholders",
        ],
      },
    ],
  },
  "frontend-developer": {
    title: "Frontend Developer",
    stages: [
      {
        title: "Stage 1: Web Fundamentals",
        duration: "3-5 weeks",
        icon: <BookOpen className="w-6 h-6" />,
        description: "Build strong foundations in HTML, CSS, and JavaScript.",
        items: [
          "HTML5 semantic markup and accessibility",
          "CSS3: Flexbox, Grid, and responsive design",
          "JavaScript fundamentals and DOM manipulation",
        ],
        resources: [
          { title: "Modern HTML & CSS", type: "Course", time: "15 hours" },
          { title: "JavaScript Basics", type: "Interactive", time: "12 hours" },
          { title: "Responsive Design Principles", type: "Video", time: "8 hours" },
        ],
        milestones: [
          "Build a responsive portfolio website",
          "Create interactive web components",
          "Implement mobile-first design",
        ],
      },
      {
        title: "Stage 2: Modern Frameworks",
        duration: "6-8 weeks",
        icon: <Zap className="w-6 h-6" />,
        description: "Master React and modern frontend development tools.",
        items: [
          "React fundamentals: components, state, props",
          "State management with Context API or Redux",
          "Modern tooling: Vite, Webpack, and package managers",
        ],
        resources: [
          { title: "React Complete Guide", type: "Course", time: "20 hours" },
          { title: "Modern Frontend Tooling", type: "Guide", time: "6 hours" },
          { title: "State Management Patterns", type: "Video", time: "10 hours" },
        ],
        milestones: [
          "Build a React application with multiple components",
          "Implement state management solution",
          "Set up build tools and deployment pipeline",
        ],
      },
      {
        title: "Stage 3: Advanced Concepts & Performance",
        duration: "4-6 weeks",
        icon: <Award className="w-6 h-6" />,
        description: "Optimize performance and master advanced frontend concepts.",
        items: [
          "Performance optimization and lazy loading",
          "Testing: unit, integration, and E2E testing",
          "TypeScript and advanced JavaScript patterns",
        ],
        resources: [
          { title: "Frontend Performance", type: "Course", time: "12 hours" },
          { title: "Testing Strategies", type: "Workshop", time: "8 hours" },
          { title: "TypeScript Mastery", type: "Course", time: "10 hours" },
        ],
        milestones: [
          "Optimize application performance metrics",
          "Implement comprehensive testing suite",
          "Convert project to TypeScript",
        ],
      },
    ],
  },
}

export default function RoadmapPage() {
  const params = useParams()
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([])
  const [activeStage, setActiveStage] = useState(0)
  const [roadmap, setRoadmap] = useState<{ title: string; stages: StageDetail[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params?.role) {
      const roleKey = (params.role as string).toLowerCase()
      const foundRoadmap = roleRoadmaps[roleKey]
      setRoadmap(foundRoadmap || null)
      setIsLoading(false)
    }
  }, [params])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Loading Roadmap...</h1>
            <p className="text-muted-foreground">Preparing your career path</p>
          </Card>
        </div>
      </main>
    )
  }

  if (!roadmap) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Role Not Found</h1>
            <p className="text-muted-foreground mb-6">We don't have a roadmap for this role yet. Try another one.</p>
            <Link href="/recommendations">
              <Button>Back to Recommendations</Button>
            </Link>
          </Card>
        </div>
      </main>
    )
  }

  const toggleMilestone = (milestone: string) => {
    setCompletedMilestones((prev) =>
      prev.includes(milestone) ? prev.filter((m) => m !== milestone) : [...prev, milestone],
    )
  }

  const totalMilestones = roadmap.stages.reduce((sum, stage) => sum + stage.milestones.length, 0)
  const progress = totalMilestones > 0 ? (completedMilestones.length / totalMilestones) * 100 : 0

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/recommendations" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Recommendations
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">{roadmap.title} Roadmap</h1>
          <p className="text-lg text-muted-foreground">
            Follow this structured path to build skills and land your dream role.
          </p>
        </div>

        <Card className="p-6 mb-12 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedMilestones.length} of {totalMilestones} milestones completed
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </Card>

        <Tabs
          value={`stage-${activeStage}`}
          onValueChange={(value) => setActiveStage(Number.parseInt(value.split("-")[1]))}
        >
          <TabsList
            className="grid w-full gap-2 mb-8"
            style={{ gridTemplateColumns: `repeat(${roadmap.stages.length}, 1fr)` }}
          >
            {roadmap.stages.map((stage, idx) => (
              <TabsTrigger key={idx} value={`stage-${idx}`} className="text-xs sm:text-sm">
                Stage {idx + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {roadmap.stages.map((stage, stageIdx) => (
            <TabsContent key={stageIdx} value={`stage-${stageIdx}`}>
              <Card className="p-8 space-y-8">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{stage.title}</h2>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {stage.duration}
                      </p>
                    </div>
                    <Badge className="text-base">{stage.duration}</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">{stage.description}</p>
                </div>

                {/* Learning Items */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {stage.items.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Recommended Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {stage.resources.map((resource, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-border bg-secondary/5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-foreground">{resource.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{resource.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">Milestones to Complete</h3>
                  <div className="space-y-3">
                    {stage.milestones.map((milestone, idx) => (
                      <button
                        key={idx}
                        onClick={() => toggleMilestone(`${stageIdx}-${idx}`)}
                        className="w-full p-4 rounded-lg border border-border bg-background hover:bg-secondary/5 transition-all text-left flex items-start gap-3"
                      >
                        {completedMilestones.includes(`${stageIdx}-${idx}`) ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            completedMilestones.includes(`${stageIdx}-${idx}`)
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }
                        >
                          {milestone}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-4 pt-8">
                  <Button variant="outline" disabled={stageIdx === 0} onClick={() => setActiveStage(stageIdx - 1)}>
                    Previous Stage
                  </Button>
                  <Button
                    disabled={stageIdx === roadmap.stages.length - 1}
                    onClick={() => setActiveStage(stageIdx + 1)}
                  >
                    Next Stage
                  </Button>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need guidance? Ask our AI advisor for help with any stage or resource recommendations.
          </p>
          <Link href="/#chatbot">
            <Button variant="outline">Chat with AI Advisor</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
