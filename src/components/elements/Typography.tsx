import { cva } from "class-variance-authority";

const Typography = (
  p: React.HTMLAttributes<HTMLHeadingElement> & {
    variant: "h1" | "h2" | "h3" | "body";
  },
) => {
  const Tag = p.variant === "body" ? "p" : p.variant;
  const classes = cva("", {
    variants: {
      variant: {
        h1: "text-sm font-semibold tracking-tight text-primary-800 dark:text-primary-100",
        h2: "text-xl font-semibold text-primary-900 dark:text-primary-100",
        h3: "mb-2 text-lg font-semibold text-primary-900 dark:text-primary-100",
        body: "mb-2 leading-2 text-primary-700 dark:text-primary-200",
      },
    },
    defaultVariants: {
      variant: "body",
    },
  });

  return (
    <Tag
      {...p}
      className={classes({
        variant: p.variant,
        className: p.className,
      })}
    >
      {p.children}
    </Tag>
  );
};

export default Typography;
