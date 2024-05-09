import { twMerge } from "tailwind-merge";

interface CheckboxProps {
    label: React.ReactNode;
    state: boolean;
    setState: (newState: boolean) => void;
    className?: string;
}

export function Checkbox(p: CheckboxProps) {
    return (
        <div className={twMerge("flex items-center gap-4", p.className)}>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-primary-200 transition-all checked:border-primary-800 checked:bg-primary-800 hover:bg-primary-100 checked:hover:bg-primary-700 dark:border-primary-700 dark:checked:border-primary-500 dark:checked:bg-primary-600 dark:hover:bg-primary-500 dark:checked:hover:bg-primary-500"
                    id="checkbox"
                    checked={p.state}
                    onChange={() => p.setState(!p.state)}
                />
                <span className="pointer-events-none absolute p-1 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </span>
            </div>
            <label
                htmlFor="checkbox"
                className="text-primary-700 dark:text-primary-200"
            >
                {p.label}
            </label>
        </div>
    );
}
