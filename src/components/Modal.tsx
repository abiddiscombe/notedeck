import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { serviceNote } from "../database/serviceNote";

type ModalProps = {
    title: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
    children: React.ReactNode;
};

export function Modal(p: ModalProps) {
    const highestZIndex = useLiveQuery(() => serviceNote.getTopZIndex());

    return (
        <Transition appear show={p.isOpen} as={Fragment}>
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
                    <div className="fixed inset-0 bg-black/50" />
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
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-8 text-left align-middle shadow transition-all">
                                <Dialog.Title as={Fragment}>
                                    {p.title}
                                </Dialog.Title>
                                {p.children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
