import type { LucideIcon } from "lucide-react"

interface FlipCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FlipCard({ icon: Icon, title, description }: FlipCardProps) {
  return (
    <div className="flip-card">
      <div className="flip-icon">
        <Icon size={48} strokeWidth={1.5} className="text-slate-600" />
      </div>
      <div className="flip-content flex flex-col justify-center">
        <p className="flip-title">{title}</p>
        <p className="flip-desc">{description}</p>
      </div>
    </div>
  )
}
