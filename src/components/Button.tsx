"use client";
import Link from "next/link";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
  className?: string;
};

export type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

function classes(variant: ButtonVariant, size: ButtonSize, extra?: string) {
  const base = "btn inline-flex items-center justify-center";
  const byVariant = variant === "primary" ? "btn-primary" : "btn-secondary";
  const bySize = size === "lg" ? "h-10 px-5" : size === "sm" ? "h-8 px-3 text-sm" : "h-9 px-4";
  return [base, byVariant, bySize, extra].filter(Boolean).join(" ");
}

export const Button: FC<ButtonProps> = ({ variant = "primary", size = "md", href, className, children, ...rest }) => {
  if (href) {
    return (
      <Link href={href} className={classes(variant, size, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;


