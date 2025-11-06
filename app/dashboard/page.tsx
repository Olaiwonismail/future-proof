"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, TrendingUp, BookOpen, CheckCircle2, Clock, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"

interface ProgressData {
  role: string
  stage: number
  milestonesCompleted: number
  totalMilestones: number
  progress: number
  lastUpdated: string
  timeInvested: number
}

interface SkillProgress {
  name: string
  proficiency: number
  targetProficiency: number
}

export default function DashboardPage() {
  const [progressData, setProgressData] = useState<ProgressData[]>([])
  const [skillsProgress, setSkillsProgress] = useState<SkillProgress[]>([])
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    const loadProgress = () => {
      try {
        const assessmentData = sessionStorage.getItem("userAssessment")
        const savedProgress = localStorage.getItem("progressData")

        if (assessmentData) {
          const assessment = JSON.parse(assessmentData)

          // Initialize mock progress data based on assessment
          const mockProgress: ProgressData[] = [
            {
              role: "Data Analyst",
              stage: 1,
              milestonesCompleted: 2,
              totalMilestones: 9,
              progress: 22,
              lastUpdated: new Date().toISOString(),
              timeInvested: 8,
            },
            {
              role: "Machine Learning Engineer",
              stage: 0,
              milestonesCompleted: 0,
              totalMilestones: 9,
              progress: 0,
              lastUpdated: new Date().toISOString(),
              timeInvested: 0,
            },
            {
              role: "Product Manager",
              stage: 1,
              milestonesCompleted: 1,
              totalMilestones: 9,
              progress: 11,
              lastUpdated: new Date().toISOString(),
              timeInvested: 4,
            },
          ]

          // Mock skills progress
          const mockSkills: SkillProgress[] = assessment.selectedSkills.map((skill: string) => ({
            name: skill,
            proficiency: Math.floor(Math.random() * 60) + 20,
            targetProficiency: 90,
          }))

          const totalHoursInvested = mockProgress.reduce((sum) => sum + 12, 0)

          setProgressData(mockProgress)
          setSkillsProgress(mockSkills)
          setTotalHours(totalHoursInvested)
        }
      } catch (error) {
        console.error("Error loading progress:", error)
      }
    }

    loadProgress()
  }, [])

  const totalProgress =
    progressData.length > 0 ? Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / progressData.length) : 0

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Your Learning Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Track your progress, manage multiple learning paths, and stay motivated.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-foreground">{totalProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hours Invested</p>
                <p className="text-3xl font-bold text-foreground">{totalHours}</p>
              </div>
              <Clock className="w-8 h-8 text-accent opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Paths</p>
                <p className="text-3xl font-bold text-foreground">{progressData.length}</p>
              </div>
              <Target className="w-8 h-8 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Milestones Done</p>
                <p className="text-3xl font-bold text-foreground">
                  {progressData.reduce((sum, p) => sum + p.milestonesCompleted, 0)}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-accent opacity-50" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="paths" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="skills">Skills Progress</TabsTrigger>
          </TabsList>

          {/* Learning Paths Tab */}
          <TabsContent value="paths" className="space-y-6">
            {progressData.length > 0 ? (
              progressData.map((path, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{path.role}</h3>
                      <p className="text-sm text-muted-foreground">
                        Stage {path.stage + 1} · {path.milestonesCompleted} of {path.totalMilestones} milestones
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">{path.progress}% Complete</Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Time Invested</p>
                      <p className="font-semibold text-foreground">{path.timeInvested}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Estimated Remaining</p>
                      <p className="font-semibold text-foreground">
                        {Math.ceil(((100 - path.progress) / (path.progress || 1)) * path.timeInvested)}h
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Updated</p>
                      <p className="font-semibold text-foreground">Today</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/roadmap/${path.role.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Learning
                    </Button>
                  </Link>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No active learning paths yet.</p>
                <Link href="/assessment">
                  <Button>Start Assessment</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          {/* Skills Progress Tab */}
          <TabsContent value="skills" className="space-y-6">
            {skillsProgress.length > 0 ? (
              skillsProgress.map((skill, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <span className="text-sm font-medium text-primary">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Target: {skill.targetProficiency}%</p>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Your skills progress will appear here once you start learning.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Recommendations Section */}
        <Card className="mt-12 p-8 bg-secondary/5 border-primary/10">
          <h2 className="text-xl font-bold mb-4 text-foreground">Next Recommended Actions</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Complete one more milestone in your current stage to maintain momentum</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Focus on building your SQL skills – they're critical for multiple roles</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Start a small project to apply what you've learned so far</span>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  )
}
