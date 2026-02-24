import Link from "next/link";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const dottedLinkClasses = `text-body text-foreground hover:text-muted
  focus-visible:ring-border-strong focus-visible:ring-offset-background
  relative cursor-pointer pb-1 transition-colors focus:outline-none
  focus-visible:ring-1 focus-visible:ring-offset-1 inline box-decoration-clone
  bg-[length:100%_1px] bg-no-repeat bg-[position:0_100%]
  bg-[repeating-linear-gradient(to_right,var(--color-border-strong)_0,var(--color-border)_2px,transparent_2px,transparent_4px)]`;

export interface DottedLinkProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className"
> {
  /** Additional class names */
  className?: string;
  /** Open link in a new tab */
  openInNewTab?: boolean;
}

export const DottedLink = forwardRef<HTMLAnchorElement, DottedLinkProps>(
  ({ children, className = "", openInNewTab, target, rel, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={`${dottedLinkClasses} ${className}`}
        target={openInNewTab ? "_blank" : target}
        rel={openInNewTab ? "noopener noreferrer" : rel}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

DottedLink.displayName = "DottedLink";
