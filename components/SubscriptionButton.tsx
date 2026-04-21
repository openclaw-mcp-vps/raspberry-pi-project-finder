import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SubscriptionButton({ className, children }: SubscriptionButtonProps) {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  if (!paymentLink) {
    return (
      <span
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md border border-amber-400/30 bg-amber-400/10 px-4 text-sm font-medium text-amber-200",
          className
        )}
      >
        Add NEXT_PUBLIC_STRIPE_PAYMENT_LINK
      </span>
    );
  }

  return (
    <a
      href={paymentLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-4 text-sm font-semibold text-white transition hover:bg-blue-400",
        className
      )}
    >
      {children ?? "Unlock for $7/month"}
    </a>
  );
}
