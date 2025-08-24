import { CheckIcon } from "@heroicons/react/16/solid";
import * as _Checkbox from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaCheckbox = cva([
  "*:h-3.3 flex size-5 items-center justify-center rounded-sm border *:w-3.5 disabled:cursor-not-allowed disabled:opacity-30",
  "border-neutral-200 bg-neutral-100 *:fill-neutral-700 enabled:hover:bg-neutral-200 enabled:hover:active:border-neutral-300 enabled:hover:active:bg-neutral-300",
  "dark:border-neutral-700 dark:bg-neutral-800 dark:*:fill-neutral-200 dark:enabled:hover:bg-neutral-700 dark:enabled:hover:active:border-neutral-600 dark:enabled:hover:active:bg-neutral-600",
]);

export function Checkbox({
  className,
  ...passthrough
}: React.ComponentProps<typeof _Checkbox.Root> &
  VariantProps<typeof cvaCheckbox>) {
  return (
    <_Checkbox.Root
      className={twMerge(cvaCheckbox({ className }))}
      {...passthrough}
    >
      <_Checkbox.Indicator asChild={true}>
        <CheckIcon />
      </_Checkbox.Indicator>
    </_Checkbox.Root>
  );
}
