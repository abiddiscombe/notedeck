import * as _Tooltip from "@radix-ui/react-tooltip";
import { cva } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export function Tooltip({
  ...passthrough
}: React.ComponentProps<typeof _Tooltip.Root>) {
  return (
    <_Tooltip.Provider>
      <_Tooltip.Root {...passthrough} />
    </_Tooltip.Provider>
  );
}

export function TooltipTrigger({
  ...passthrough
}: Omit<React.ComponentProps<typeof _Tooltip.Trigger>, "asChild">) {
  return <_Tooltip.Trigger asChild={true} {...passthrough} />;
}

const cvaTooltipContent = cva([
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 w-max rounded-sm border px-2 py-1 text-center text-xs shadow",
  "border-neutral-200 bg-white text-neutral-700",
  "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
]);

export function TooltipContent({
  className,
  sideOffset = 10,
  ...passthrough
}: React.ComponentProps<typeof _Tooltip.Content>) {
  return (
    <_Tooltip.Portal>
      <_Tooltip.Content
        sideOffset={sideOffset}
        className={twMerge(cvaTooltipContent({ className }))}
        {...passthrough}
      />
    </_Tooltip.Portal>
  );
}
