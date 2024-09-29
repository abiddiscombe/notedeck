import { twMerge } from "tailwind-merge";

const Tooltip = (
  p: React.HTMLAttributes<HTMLDivElement> & {
    label: string;
  },
) => {
  return (
    <div {...p} className="group relative flex flex-col items-center">
      {p.children}
      <span
        className={twMerge(
          "absolute top-10 z-50 hidden w-max rounded border border-primary-200 bg-white px-2 py-1 text-center text-xs text-primary-600 shadow-sm group-hover:block dark:border-primary-700 dark:bg-primary-800 dark:text-primary-200",
          p.className,
        )}
      >
        {p.label}
      </span>
    </div>
  );
};

export default Tooltip;
