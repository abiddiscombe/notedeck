import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/16/solid";

type NoteMenuButtonProps = {
    onClick: VoidFunction;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    isDangerousAction?: boolean;
};

export function NoteMenuButton(p: NoteMenuButtonProps) {
    return (
        <button
            onClick={p.onClick}
            className={clsx(
                "group flex w-full items-center gap-3 rounded px-3 py-1 hover:bg-gray-100 active:bg-gray-200",
                "[&>svg]:w-3.5 [&>svg]:text-gray-500",
                p.isDangerousAction &&
                    "hover:bg-red-600 active:bg-red-700 [&>svg]:hover:text-white [&>svg]:active:text-white",
            )}
        >
            {p.icon}
            <span
                className={clsx(
                    "text-sm text-gray-800",
                    p.isDangerousAction &&
                        "group-hover:text-white group-active:text-white",
                )}
            >
                {p.label}
            </span>
            {p.isActive && (
                <CheckIcon className="h-4.5 ml-auto fill-green-600" />
            )}
        </button>
    );
}
