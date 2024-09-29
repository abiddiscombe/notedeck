import { twMerge } from "tailwind-merge";

const Notice = (
  p: React.HTMLAttributes<HTMLDivElement> & {
    variant?: "success" | "error" | "warning";
  },
) => {
  const variant = p.variant ?? "info";

  return (
    <div
      role="alert"
      className={twMerge(
        "my-4 rounded border border-l-4 p-4 text-primary-800 dark:text-primary-200",
        variant === "success" &&
          "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-900/40",
        variant === "error" &&
          "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/40",
        variant === "warning" &&
          "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/40",
        p.className,
      )}
    >
      {p.children}
    </div>
  );
};

export default Notice;
