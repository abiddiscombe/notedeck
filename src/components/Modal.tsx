import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../database/serviceNote";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Typography } from "./elements/Typography";

interface ModalProps {
    title: string;
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
    children: React.ReactNode;
}

export function Modal(p: ModalProps) {
    const highestZIndex = useLiveQuery(() => serviceNote.getTopZIndex());

    return (
        <Transition
            appear
            show={p.isOpen}
            as={Fragment}
        >
            <Dialog
                as="div"
                style={{ zIndex: highestZIndex + 1 }}
                className="relative"
                onClose={() => p.setIsOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-150"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-50"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow transition-all dark:border dark:border-primary-800 dark:bg-primary-900">
                                <div className="flex items-center justify-between pb-4">
                                    <Dialog.Title as={Fragment}>
                                        <Typography.H2 noMargin={true}>
                                            {p.title}
                                        </Typography.H2>
                                    </Dialog.Title>
                                    <button
                                        onClick={() => p.setIsOpen(false)}
                                        className="rounded-full outline outline-8 outline-white/0 hover:bg-primary-50 hover:outline-primary-50 active:bg-primary-100 active:outline-primary-100 dark:hover:bg-primary-700 dark:hover:outline-primary-700 dark:active:bg-primary-600 dark:active:outline-primary-600"
                                    >
                                        <XMarkIcon className="h-6 text-primary-600 dark:text-primary-200" />
                                    </button>
                                </div>
                                {p.children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
