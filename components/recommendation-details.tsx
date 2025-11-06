import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface RecommendationDetailsProps {
  title: string
  whyGoodFit: string
  nextSteps: string
}

export default function RecommendationDetails({ title, whyGoodFit, nextSteps }: RecommendationDetailsProps) {
  const steps = nextSteps.split("\n").filter((step) => step.trim())

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="font-semibold text-foreground mb-2">Why This Role?</h3>
        <p className="text-sm text-muted-foreground">{whyGoodFit}</p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-3">Your Action Plan</h3>
        <ul className="space-y-2">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{step.replace(/^[\d\-.)]+\s*/, "")}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
