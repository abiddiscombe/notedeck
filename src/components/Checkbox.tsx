import { twMerge } from "tailwind-merge";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Checkbox as HCheckbox } from "@headlessui/react";

interface CheckboxProps extends React.HTMLAttributes<HTMLSpanElement> {
    state: boolean;
    setState: VoidFunction;
}

export function Checkbox(p: CheckboxProps) {
    return (
        <HCheckbox
            checked={p.state}
            onChange={() => p.setState()}
            className={twMerge(
                "group size-5 cursor-pointer rounded border border-primary-200 p-0.5 data-[checked]:border-primary-800 data-[checked]:bg-primary-800 data-[hover]:shadow-sm dark:border-primary-700 dark:data-[checked]:border-primary-500 dark:data-[checked]:bg-primary-600 dark:data-[checked]:data-[hover]:bg-primary-500",
                p.className,
            )}
        >
            <CheckIcon className="size-3.5 fill-primary-100 opacity-0 transition-opacity group-data-[checked]:opacity-100" />
        </HCheckbox>
    );
}
