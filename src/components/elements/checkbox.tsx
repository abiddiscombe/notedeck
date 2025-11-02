import * as _Checkbox from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";

const cvaCheckbox = cva([
  "flex size-5 items-center justify-center rounded-sm border disabled:cursor-not-allowed disabled:opacity-30",
  "border-base-200 bg-base-100 *:text-base-700 enabled:hover:bg-base-200 enabled:hover:active:border-base-300 enabled:hover:active:bg-base-300",
  "dark:border-base-700 dark:bg-base-800 dark:*:text-base-100 dark:enabled:hover:bg-base-700 dark:enabled:hover:active:border-base-600 dark:enabled:hover:active:bg-base-600",
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
