import * as _Dialog from "@radix-ui/react-dialog";
import * as _VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Surface } from "../surface";
import "./dialog.css";

export const Dialog = ({
  children,
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Root>) => {
  return (
    <_Dialog.Root {...passthrough}>
      <_Dialog.Portal>{children}</_Dialog.Portal>
    </_Dialog.Root>
  );
};

const cvaDialogOverlay = cva(
  "absolute top-0 z-50 grid h-dvh w-full bg-neutral-950/20",
  {
    variants: {
      blur: {
        true: "backdrop-blur-xs",
        false: null,
      },
    },
    defaultVariants: {
      blur: false,
    },
  },
);

export const DialogOverlay = ({
  blur,
  className,
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Overlay> &
  VariantProps<typeof cvaDialogOverlay>) => {
  return (
    <_Dialog.Overlay
      className={twMerge(cvaDialogOverlay({ blur, className }))}
      {...passthrough}
    />
  );
};

const cvaDialogContent = cva("absolute top-0 z-50 grid h-dvh w-full", {
  variants: {
    align: {
      left: "justify-start *:max-w-sm *:min-w-sm *:rounded-l-none *:border-y-0 *:border-l-0 *:shadow-lg",
      right:
        "justify-end *:max-w-sm *:min-w-sm *:rounded-r-none *:border-y-0 *:border-r-0 *:shadow-lg",
      bottom:
        "items-end justify-stretch *:rounded-b-none *:border-x-0 *:border-b-0 *:shadow-lg",
      center: "place-items-center *:max-w-lg",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export const DialogContent = ({
  title,
  align,
  children,
  className,
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Content> &
  VariantProps<typeof cvaDialogContent>) => {
  return (
    <_Dialog.Content
      className={twMerge(cvaDialogContent({ align, className }))}
      aria-describedby={undefined}
    >
      <_VisuallyHidden.Root asChild={true}>
        <_Dialog.Title>{title}</_Dialog.Title>
      </_VisuallyHidden.Root>
      <Surface {...passthrough}>{children}</Surface>
    </_Dialog.Content>
  );
};
