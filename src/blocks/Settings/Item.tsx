import { Field, Label, Description } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    summary?: string;
}

export function Item(p: ItemProps) {
    return (
        <Field
            className={twMerge(
                "mb-4 mt-2 flex gap-6",
                p.summary ? "items-start [&>span]:mt-0.5" : "items-center",
            )}
        >
            {p.children}
            <div>
                <Label
                    passive
                    className="text-primary-800 dark:text-primary-200"
                >
                    {p.label}
                </Label>
                {p.summary && (
                    <Description className="text-pretty text-xs text-primary-500 dark:text-primary-400">
                        {p.summary}
                    </Description>
                )}
            </div>
        </Field>
    );
}
