import Link from "next/link";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  disabled,
  asChild = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90",
    secondary:
      "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]",
    outline:
      "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]",
    ghost:
      "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]",
    destructive:
      "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  const combinedClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  const Comp = asChild ? Slot : "button";

  if (href && !asChild) {
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Comp className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </Comp>
  );
}
