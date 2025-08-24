import * as _Dialog from "@radix-ui/react-dialog";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Surface } from "./core/surface";

export function Dialog({
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Root>) {
  return <_Dialog.Root {...passthrough} />;
}

// export function DialogTrigger({
//   ...passthrough
// }: Omit<React.ComponentProps<typeof _Dialog.Trigger>, "asChild">) {
//   return <_Dialog.Trigger asChild={true} {...passthrough} />;
// }

export function DialogPortal({
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Portal>) {
  return <_Dialog.Portal {...passthrough} />;
}

// export function DialogClose({
//   ...passthrough
// }: Omit<React.ComponentProps<typeof _Dialog.Close>, "asChild">) {
//   return <_Dialog.Close asChild={true} {...passthrough} />;
// }

export function DialogTitle({
  ...passthrough
}: Omit<React.ComponentProps<typeof _Dialog.Title>, "asChild">) {
  return <_Dialog.Title asChild={true} {...passthrough} />;
}

const cvaDialogOverlay = cva("fixed inset-0 z-50 bg-neutral-950/60");

export function DialogOverlay({
  className,
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Overlay> &
  VariantProps<typeof cvaDialogOverlay>) {
  return (
    <_Dialog.Overlay
      className={twMerge(cvaDialogOverlay({ className }))}
      {...passthrough}
    />
  );
}

const cvaDialogContent = cva(
  "fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
);

export function DialogContent({
  children,
  className,
  ...passthrough
}: React.ComponentProps<typeof _Dialog.Content>) {
  return (
    <_Dialog.Content
      asChild={true}
      aria-describedby={undefined}
      {...passthrough}
    >
      <Surface className={twMerge(cvaDialogContent({ className }))}>
        {children}
      </Surface>
    </_Dialog.Content>
  );
}
