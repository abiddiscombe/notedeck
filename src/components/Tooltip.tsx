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
          "absolute top-10 z-50 hidden w-max rounded border border-neutral-200 bg-white px-2 py-1 text-center text-xs text-neutral-600 shadow group-hover:block dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
          p.className,
        )}
      >
        {p.label}
      </span>
    </div>
  );
};

export default Tooltip;
