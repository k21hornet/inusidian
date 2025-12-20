import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface FormInputProps
  extends Omit<React.ComponentProps<"input">, "id"> {
  label: string
  name: string
  error?: string
  helperText?: string
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, error, helperText, className, ...props }, ref) => {
    const inputId = React.useId()

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <Label htmlFor={inputId} className="text-xs font-bold">
          {label}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          name={name}
          data-slot="form-input"
          className={cn(
            "rounded-lg border-[#9E9E9E] px-4 py-2.5 text-sm",
            error && "border-destructive"
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || helperText ? `${inputId}-description` : undefined}
          {...props}
        />
        {(error || helperText) && (
          <p
            id={`${inputId}-description`}
            className={cn(
              "text-xs",
              error ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

export { FormInput }

