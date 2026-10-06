import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-slate-200/70 bg-white/80 p-4 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.25)] backdrop-blur sm:rounded-[1.5rem] sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4", className)} {...props} />;
}
