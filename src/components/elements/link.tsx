import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaLink = cva(
  "text-accent-600 hover:underline hover:underline-offset-2 active:decoration-2",
);

export const Link = ({
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"a"> &
  VariantProps<typeof cvaLink> & { asChild?: boolean }) => {
  const Component = asChild ? _Slot.Root : "a";

  return (
    <Component className={twMerge(cvaLink({ className }))} {...passthrough} />
  );
};
