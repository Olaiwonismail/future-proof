"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp } from "lucide-react"

interface ProgressTrackerProps {
  roleKey: string
  currentStage: number
  completedMilestones: number
  totalMilestones: number
}

export default function ProgressTracker({
  roleKey,
  currentStage,
  completedMilestones,
  totalMilestones,
}: ProgressTrackerProps) {
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const calc = (completedMilestones / totalMilestones) * 100
    setPercentage(Math.round(calc))
  }, [completedMilestones, totalMilestones])

  const getMotivationalMessage = () => {
    if (percentage === 0) return "Great start! Begin your journey."
    if (percentage < 33) return "Nice progress! Keep it up."
    if (percentage < 66) return "You're more than halfway there!"
    if (percentage < 100) return "Almost done with this stage!"
    return "Congratulations! Stage complete!"
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">Progress</span>
          </div>
          <Badge variant="outline">{percentage}%</Badge>
        </div>

        <Progress value={percentage} className="h-2" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Completed</p>
            <p className="font-semibold text-foreground">
              {completedMilestones} of {totalMilestones}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Stage {currentStage + 1}</p>
            <p className="font-semibold text-foreground text-accent">{getMotivationalMessage()}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
