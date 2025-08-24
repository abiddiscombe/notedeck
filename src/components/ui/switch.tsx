import * as _Switch from "@radix-ui/react-switch";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaSwitch = cva([
  "inline-flex h-5.5 w-9.5 shrink-0 cursor-pointer items-center rounded-full border p-0.5 transition *:size-4 *:rounded-full *:transition disabled:cursor-not-allowed disabled:opacity-30 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 *:data-[state=checked]:translate-x-4 data-[state=checked]:hover:bg-green-600",
  "*:bg-white data-[state=unchecked]:border-neutral-200 data-[state=unchecked]:bg-neutral-100 data-[state=unchecked]:hover:bg-neutral-300",
  "*:dark:data-[state=checked]:bg-neutral-50 dark:data-[state=unchecked]:border-neutral-700 dark:data-[state=unchecked]:bg-neutral-800 *:dark:data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:hover:bg-neutral-700",
]);

export function Switch({
  className,
  ...passthrough
}: React.ComponentProps<typeof _Switch.Root> & VariantProps<typeof cvaSwitch>) {
  return (
    <_Switch.Root
      className={twMerge(cvaSwitch({ className }))}
      {...passthrough}
    >
      <_Switch.Thumb />
    </_Switch.Root>
  );
}
