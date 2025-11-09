import * as _Popover from "@radix-ui/react-popover";
import * as React from "react";
import { Surface } from "./surface";

export const Popover = ({
  ...passthrough
}: React.ComponentProps<typeof _Popover.Root>) => {
  return <_Popover.Root {...passthrough} />;
};

export const PopoverTrigger = ({
  ...passthrough
}: Omit<React.ComponentProps<typeof _Popover.Trigger>, "asChild">) => {
  return <_Popover.Trigger asChild={true} {...passthrough} />;
};

export const PopoverContent = ({
  children,
  className,
  ...passthrough
}: Omit<React.ComponentProps<typeof _Popover.Content>, "asChild">) => {
  return (
    <_Popover.Content asChild={true} {...passthrough}>
      <Surface className={className}>{children}</Surface>
    </_Popover.Content>
  );
};
