import { cva } from "class-variance-authority";

const Notice = (
  p: React.HTMLAttributes<HTMLDivElement> & {
    variant?: "success" | "error" | "warning";
  },
) => {
  const classes = cva(
    "my-4 rounded border border-l-4 p-4 text-primary-800 dark:text-primary-200",
    {
      variants: {
        variant: {
          error:
            "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-900/40",
          success:
            "border-green-400 bg-green-50 dark:border-green-600 dark:bg-green-900/40",
          warning:
            "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/40",
        },
      },
      defaultVariants: {
        variant: "success",
      },
    },
  );

  return (
    <div
      {...p}
      role="alert"
      className={classes({
        variant: p.variant,
        className: p.className,
      })}
    >
      {p.children}
    </div>
  );
};

export default Notice;
