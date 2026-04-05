import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComingSoonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string
  imageAlt: string
}

const ComingSoonCard = React.forwardRef<HTMLDivElement, ComingSoonCardProps>(
  ({ className, imageSrc, imageAlt, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-center items-center w-full h-60 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-2xl bg-white text-[#888] relative",
          className
        )}
        {...props}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain object-center block blur-sm"
        />
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none bg-white/50">
          <p>Coming soon...</p>
        </div>
      </div>
    )
  }
)

ComingSoonCard.displayName = "ComingSoonCard"

export { ComingSoonCard }

