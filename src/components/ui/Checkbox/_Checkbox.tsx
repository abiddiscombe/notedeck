import * as _Checkbox from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../Icon";

const cvaCheckbox = cva([
  "flex size-5 items-center justify-center rounded-sm border disabled:cursor-not-allowed disabled:opacity-30",
  "border-neutral-200 bg-neutral-100 *:text-neutral-700 enabled:hover:bg-neutral-200 enabled:hover:active:border-neutral-300 enabled:hover:active:bg-neutral-300",
  "dark:border-neutral-700 dark:bg-neutral-800 dark:*:text-neutral-100 dark:enabled:hover:bg-neutral-700 dark:enabled:hover:active:border-neutral-600 dark:enabled:hover:active:bg-neutral-600",
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
        <Icon>
          <CheckIcon />
        </Icon>
      </_Checkbox.Indicator>
    </_Checkbox.Root>
  );
}
