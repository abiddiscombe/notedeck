import { twMerge } from "tailwind-merge";

const Typography = (
  p: React.HTMLAttributes<HTMLHeadingElement> & {
    variant: "h1" | "h2" | "h3" | "body";
    noMargin?: boolean;
  },
) => {
  if (p.variant === "h1") {
    return (
      <h1
        {...p}
        className={twMerge(
          "text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100",
          !p.noMargin && "mb-10",
          p.className,
        )}
      >
        {p.children}
      </h1>
    );
  }

  if (p.variant === "h2") {
    return (
      <h2
        {...p}
        className={twMerge(
          "text-xl font-bold text-neutral-800 dark:text-neutral-100",
          !p.noMargin && "mb-4",
          p.className,
        )}
      >
        {p.children}
      </h2>
    );
  }

  if (p.variant === "h3") {
    return (
      <h3
        {...p}
        className={twMerge(
          "text-lg font-semibold text-neutral-800 dark:text-neutral-100",
          !p.noMargin && "mt-4",
          p.className,
        )}
      >
        {p.children}
      </h3>
    );
  }

  if (p.variant === "body") {
    return (
      <p
        {...p}
        className={twMerge(
          "text-neutral-700 dark:text-neutral-200",
          !p.noMargin && "mb-2",
          p.className,
        )}
      >
        {p.children}
      </p>
    );
  }

  return null;
};

export default Typography;
