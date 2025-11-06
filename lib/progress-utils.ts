export interface ProgressTracker {
  userId: string
  roles: RoleProgress[]
  skills: SkillProgress[]
  totalHoursInvested: number
  lastUpdated: string
}

export interface RoleProgress {
  role: string
  stage: number
  completedMilestones: string[]
  completedCourses: string[]
  notes: string
}

export interface SkillProgress {
  skillName: string
  currentLevel: number
  targetLevel: number
  practiceHours: number
}

export const saveProgress = (roleKey: string, stage: number, milestoneId: string) => {
  try {
    const existingProgress = localStorage.getItem("progressData")
    const progress = existingProgress ? JSON.parse(existingProgress) : {}

    if (!progress[roleKey]) {
      progress[roleKey] = {
        stage,
        completedMilestones: [],
      }
    }

    if (!progress[roleKey].completedMilestones.includes(milestoneId)) {
      progress[roleKey].completedMilestones.push(milestoneId)
    }

    progress[roleKey].lastUpdated = new Date().toISOString()
    localStorage.setItem("progressData", JSON.stringify(progress))
  } catch (error) {
    console.error("Error saving progress:", error)
  }
}

export const getProgress = (roleKey: string) => {
  try {
    const progress = localStorage.getItem("progressData")
    if (!progress) return null
    const parsed = JSON.parse(progress)
    return parsed[roleKey] || null
  } catch (error) {
    console.error("Error getting progress:", error)
    return null
  }
}

export const calculateProgressPercentage = (completedMilestones: number, totalMilestones: number) => {
  if (totalMilestones === 0) return 0
  return Math.round((completedMilestones / totalMilestones) * 100)
}

export const getTimeEstimate = (stage: number, completedMilestones: number) => {
  const timePerStage = [14, 28, 21] // in hours
  const stageTime = timePerStage[stage] || 14
  const timePerMilestone = stageTime / 3
  return Math.ceil(timePerMilestone * (3 - completedMilestones))
}

export const logLearningSession = (roleKey: string, hoursSpent: number, notes?: string) => {
  try {
    const sessions = localStorage.getItem("learningSessions")
    const parsed = sessions ? JSON.parse(sessions) : []

    parsed.push({
      roleKey,
      hoursSpent,
      notes,
      timestamp: new Date().toISOString(),
    })

    localStorage.setItem("learningSessions", JSON.stringify(parsed))
  } catch (error) {
    console.error("Error logging session:", error)
  }
}

export const getTotalHoursInvested = () => {
  try {
    const sessions = localStorage.getItem("learningSessions")
    if (!sessions) return 0
    const parsed = JSON.parse(sessions)
    return parsed.reduce((sum: number, session: { hoursSpent: number }) => sum + session.hoursSpent, 0)
  } catch (error) {
    console.error("Error calculating total hours:", error)
    return 0
  }
}
