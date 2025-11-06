import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RoleCardProps {
  title: string
  description: string
  badge: string
  whyGoodFit?: string
  nextSteps?: string
}

export default function RoleCard({ title, description, badge, whyGoodFit, nextSteps }: RoleCardProps) {
  return (
    <Card className="p-8 flex flex-col">
      <Badge className="w-fit mb-4 bg-primary/10 text-primary">{badge}</Badge>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-1">{description}</p>
      <Link href={`/roadmap/${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <Button className="w-full rounded-full">
          <MapPin className="w-4 h-4 mr-2" />
          View Roadmap
        </Button>
      </Link>
    </Card>
  )
}
