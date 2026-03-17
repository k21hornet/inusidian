import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("font-bold", {
  variants: {
    variant: {
      h1: "text-[22px]",
      h2: "text-[20px]",
      h3: "text-[18px]",
      h4: "text-[16px]",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", as, ...props }, ref) => {
    const Component = as || variant || "h1"

    return (
      <Component
        ref={ref}
        data-slot="heading"
        className={cn(headingVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

Heading.displayName = "Heading"

export { Heading, headingVariants }

