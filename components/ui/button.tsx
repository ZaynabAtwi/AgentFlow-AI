import { cn } from "@/lib/utils";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "rounded-lg bg-brand-gradient px-4 py-2 font-medium text-white shadow-lg shadow-fuchsia-900/20 transition hover:opacity-90 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
