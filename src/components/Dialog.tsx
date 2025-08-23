import {
  Dialog as _Dialog,
  CloseButton,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useLiveQuery } from "dexie-react-hooks";
import { Fragment } from "react";
import notes from "../database/notes";
import Typography from "./Typography";

const Dialog = (
  p: React.HTMLAttributes<HTMLElement> & {
    title: string;
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
    children: React.ReactNode;
  },
) => {
  const highestZIndex = useLiveQuery(() => notes.getTopZIndex());

  return (
    <Transition appear show={p.isOpen}>
      <_Dialog
        as="div"
        style={{ zIndex: highestZIndex + 1 }}
        className="relative"
        onClose={() => p.setIsOpen(false)}
      >
        <TransitionChild
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-8 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between pb-4">
                  <DialogTitle as={Fragment}>
                    <Typography variant="h2" noMargin={true}>
                      {p.title}
                    </Typography>
                  </DialogTitle>
                  <CloseButton
                    aria-label="Close Dialog"
                    className="rounded-full outline outline-8 outline-white/0 hover:bg-neutral-50 hover:outline-neutral-50 active:bg-neutral-100 active:outline-neutral-100 dark:hover:bg-neutral-700 dark:hover:outline-neutral-700 dark:active:bg-neutral-600 dark:active:outline-neutral-600"
                  >
                    <XMarkIcon className="h-6 text-neutral-600 dark:text-neutral-200" />
                  </CloseButton>
                </div>
                {p.children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </_Dialog>
    </Transition>
  );
};

export default Dialog;
