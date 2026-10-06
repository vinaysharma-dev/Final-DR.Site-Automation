import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--brand-primary)] text-white hover:opacity-90 shadow-sm",
        outline: "border border-black/10 bg-white text-slate-900 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
      },
      size: {
        default: "min-h-12 px-6 text-sm",
        sm: "min-h-10 px-4 text-sm",
        lg: "min-h-12 px-7 text-base sm:min-h-14 sm:px-8 sm:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
