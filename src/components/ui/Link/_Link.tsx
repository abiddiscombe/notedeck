import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const cvaLink = cva(
  "underline underline-offset-2 visited:text-inherit hover:decoration-2 hover:active:decoration-3",
);

export function Link({
  asChild,
  className,
  ...passthrough
}: React.ComponentProps<"a"> &
  VariantProps<typeof cvaLink> & { asChild?: boolean }) {
  const Component = asChild ? _Slot.Root : "a";

  return (
    <Component className={twMerge(cvaLink({ className }))} {...passthrough} />
  );
}
