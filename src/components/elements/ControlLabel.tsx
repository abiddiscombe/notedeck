import { twMerge } from "tailwind-merge";
import { Field, Label, Description } from "@headlessui/react";

interface ControlLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    summary?: string;
}

export function ControlLabel(p: ControlLabelProps) {
    return (
        <Field
            className={twMerge(
                "mb-4 mt-2 flex items-start justify-between gap-4",
                p.className,
            )}
        >
            <div className="max-w-xs">
                <Label
                    passive
                    className="text-primary-800 dark:text-primary-200"
                >
                    {p.label}
                </Label>
                {p.summary && (
                    <Description className="text-xs text-primary-500 dark:text-primary-400">
                        {p.summary}
                    </Description>
                )}
            </div>
            {p.children}
        </Field>
    );
}
