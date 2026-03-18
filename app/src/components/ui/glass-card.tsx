import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "bg-card/80 backdrop-blur-lg",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

export { GlassCard }
