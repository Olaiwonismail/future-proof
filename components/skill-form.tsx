"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle } from "lucide-react"

const suggestedSkills = [
  "Communication",
  "SQL",
  "Python",
  "Problem Solving",
  "Excel",
  "JavaScript",
  "Data Analysis",
  "Critical Thinking",
]

const interestAreas = [
  { id: "data", label: "Data & Analytics", icon: "📊" },
  { id: "tech", label: "Technology & Code", icon: "💻" },
  { id: "business", label: "Business & Strategy", icon: "📈" },
  { id: "design", label: "Design & UX", icon: "🎨" },
  { id: "marketing", label: "Marketing & Sales", icon: "📢" },
  { id: "management", label: "People & Management", icon: "👥" },
]

const learningStyles = [
  { id: "hands-on", label: "Hands-On Learning" },
  { id: "visual", label: "Visual/Video Learning" },
  { id: "reading", label: "Reading & Documentation" },
  { id: "mentoring", label: "Learning from Mentors" },
]

const experienceLevels = [
  { id: "beginner", label: "Beginner - Just Starting Out" },
  { id: "intermediate", label: "Intermediate - Some Experience" },
  { id: "advanced", label: "Advanced - Substantial Experience" },
]

interface FormData {
  name: string
  currentField: string
  careerGoal: string
  skills: string
  interests: string[]
  learningStyle: string
  experienceLevel: string
}

export default function SkillForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    currentField: "",
    careerGoal: "",
    skills: "",
    interests: [],
    learningStyle: "",
    experienceLevel: "",
  })
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basics")

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Combine all data and navigate
    const assessment = {
      ...formData,
      selectedSkills,
      timestamp: new Date().toISOString(),
    }
    // Store in session/local storage for recommendations page
    sessionStorage.setItem("userAssessment", JSON.stringify(assessment))
    router.push("/recommendations")
  }

  const isFormValid = formData.currentField && formData.experienceLevel && selectedSkills.length > 0

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Discover Your Perfect Career Path</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Answer a few questions about your skills, interests, and learning style to get personalized recommendations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
          <TabsTrigger value="learning">Learning Style</TabsTrigger>
        </TabsList>

        {/* Tab 1: Basics */}
        <TabsContent value="basics">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">About You</h2>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Alex"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                />
              </div>

              {/* Current Field & Career Goal */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Field *</label>
                  <input
                    type="text"
                    placeholder="e.g., Student, Retail, Marketing"
                    value={formData.currentField}
                    onChange={(e) => setFormData({ ...formData, currentField: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Career Goal (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Data Analyst, Product Manager"
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium mb-3">Experience Level *</label>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, experienceLevel: level.id })}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        formData.experienceLevel === level.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {formData.experienceLevel === level.id ? (
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className="font-medium">{level.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="button" variant="outline" onClick={() => setActiveTab("skills")} className="w-full">
                Next: Skills & Interests
              </Button>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 2: Skills & Interests */}
        <TabsContent value="skills">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Your Skills & Interests</h2>

            <form className="space-y-8">
              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-3">Top Skills *</label>
                <p className="text-xs text-muted-foreground mb-4">
                  Select skills you already have or would like to develop.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tip: Select at least 2 skills to personalize your recommendations.
                </p>
              </div>

              {/* Interest Areas */}
              <div>
                <label className="block text-sm font-medium mb-3">Areas of Interest</label>
                <p className="text-xs text-muted-foreground mb-4">What topics excite you?</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {interestAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleInterest(area.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        formData.interests.includes(area.id)
                          ? "border-accent bg-accent/5"
                          : "border-border bg-background hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{area.icon}</span>
                        <span className="font-medium">{area.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setActiveTab("basics")} className="flex-1">
                  Back
                </Button>
                <Button type="button" onClick={() => setActiveTab("learning")} className="flex-1">
                  Next: Learning Style
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 3: Learning Style */}
        <TabsContent value="learning">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">How You Learn Best</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Learning Style */}
              <div>
                <label className="block text-sm font-medium mb-3">Preferred Learning Style</label>
                <p className="text-xs text-muted-foreground mb-4">Select the approach that works best for you.</p>
                <div className="space-y-2">
                  {learningStyles.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, learningStyle: style.id })}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        formData.learningStyle === style.id
                          ? "border-accent bg-accent/5"
                          : "border-border bg-background hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {formData.learningStyle === style.id ? (
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className="font-medium">{style.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-secondary/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-foreground">Your Assessment Summary</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Current Field: <span className="text-foreground">{formData.currentField || "Not specified"}</span>
                  </li>
                  <li>
                    • Experience Level:{" "}
                    <span className="text-foreground">
                      {experienceLevels.find((l) => l.id === formData.experienceLevel)?.label || "Not selected"}
                    </span>
                  </li>
                  <li>
                    • Skills Selected: <span className="text-foreground">{selectedSkills.length}</span>
                  </li>
                  <li>
                    • Interests: <span className="text-foreground">{formData.interests.length}</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setActiveTab("skills")} className="flex-1">
                  Back
                </Button>
                <Button type="submit" size="lg" className="flex-1 rounded-full" disabled={!isFormValid}>
                  Get Recommendations
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">Or ask our chatbot to help you fill this out</p>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
