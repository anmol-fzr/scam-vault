import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type H1Props = ComponentPropsWithoutRef<"h1">
export function H1({ className, ...props }: H1Props) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)} {...props} />
  )
}

type H2Props = ComponentPropsWithoutRef<"h2">
export function H2({ className, ...props }: H2Props) {
  return (
    <h2 className={cn("pb-2 text-2xl font-bold", className)} {...props} />
  )
}

type PProps = ComponentPropsWithoutRef<"p">
export function P({ className, ...props }: PProps) {
  return (
    <p className={cn("px-px py-1.5 text-sm text-muted-foreground/80", className)} {...props} />
  )
}
