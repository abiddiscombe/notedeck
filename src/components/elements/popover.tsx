import * as _Popover from "@radix-ui/react-popover";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Surface } from "./core/surface";

export const Popover = ({
  ...passthrough
}: React.ComponentProps<typeof _Popover.Root>) => {
  return <_Popover.Root {...passthrough} />;
};

export const PopoverTrigger = ({
  ...passthrough
}: React.ComponentProps<typeof _Popover.Trigger>) => {
  return <_Popover.Trigger {...passthrough} />;
};

const cvaPopoverContent = cva(
  "animate-in fade-in slide-in-from-top-2 duration-100",
);

export const PopoverContent = ({
  asChild,
  children,
  className,
  ...passthrough
}: React.ComponentProps<typeof _Popover.Content> &
  VariantProps<typeof cvaPopoverContent>) => {
  return (
    <_Popover.Content asChild={true} {...passthrough}>
      <Surface
        asChild={asChild}
        className={twMerge(cvaPopoverContent({ className }))}
      >
        {children}
      </Surface>
    </_Popover.Content>
  );
};
