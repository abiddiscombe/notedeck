import { twMerge } from "tailwind-merge";
import { Switch as HSwitch } from "@headlessui/react";

interface SwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    state: boolean;
    setState: (newState: boolean) => void;
}

export function Switch(p: SwitchProps) {
    return (
        <HSwitch
            checked={p.state}
            onChange={() => p.setState(!p.state)}
            className={twMerge(
                "group inline-flex h-5 w-9 items-center rounded-full bg-primary-200 transition data-[checked]:bg-primary-800 data-[checked]:data-[hover]:bg-primary-700 data-[hover]:bg-primary-300 dark:bg-primary-600 dark:data-[checked]:bg-primary-100",
                p.className,
            )}
        >
            <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5 dark:group-data-[checked]:bg-primary-800" />
        </HSwitch>
    );
}
