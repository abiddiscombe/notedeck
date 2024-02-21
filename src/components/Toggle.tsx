import { Switch } from "@headlessui/react";

type ToggleProps = {
    readerLabel: string;
    state: boolean;
    setState: (newState: boolean) => void;
};

export function Toggle(p: ToggleProps) {
    return (
        <Switch
            checked={p.state}
            onChange={() => p.setState(!p.state)}
            className={`${p.state ? "bg-green-600" : "bg-gray-300"}
          relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
            <span className="sr-only">{p.readerLabel}</span>
            <span
                aria-hidden="true"
                className={`${p.state ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
}
