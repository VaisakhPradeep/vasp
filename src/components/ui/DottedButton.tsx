import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface DottedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label text */
  children: React.ReactNode;
}

export const DottedButton = forwardRef<HTMLButtonElement, DottedButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`text-label text-foreground hover:text-muted
          focus-visible:ring-border-strong focus-visible:ring-offset-background
          relative cursor-pointer pb-0.75 transition-all after:absolute
          after:right-0 after:bottom-0 after:left-0 after:h-px
          after:bg-[repeating-linear-gradient(to_right,var(--color-border-strong)_0,var(--color-border)_2px,transparent_2px,transparent_4px)]
          after:transition-all after:duration-200 after:ease-out
          after:content-[''] hover:after:-bottom-0.5 focus:outline-none
          focus-visible:ring-1 focus-visible:ring-offset-1 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DottedButton.displayName = "DottedButton";
