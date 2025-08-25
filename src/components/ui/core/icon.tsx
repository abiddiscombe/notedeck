import * as _Slot from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cvaIcon = cva("stroke-[2.5]", {
  variants: {
    size: {
      sm: "h-3.5 w-3.5",
      md: "h-4.5 w-4.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export function Icon({
  size,
  className,
  ...passthrough
}: React.ComponentProps<typeof _Slot.Root> & VariantProps<typeof cvaIcon>) {
  return (
    <_Slot.Root
      className={twMerge(cvaIcon({ size, className }))}
      {...passthrough}
    />
  );
}
