import { Field, Label, Description } from "@headlessui/react";

interface ItemContainerProps {
    label: string;
    summary: string;
    children: React.ReactNode;
}

export function ItemContainer(p: ItemContainerProps) {
    return (
        <Field className="mb-4 mt-2 flex items-start justify-between gap-6">
            <div className="max-w-sm">
                <Label
                    passive
                    className="text-primary-800 dark:text-primary-200"
                >
                    {p.label}
                </Label>
                <Description className="text-pretty text-xs text-primary-500 dark:text-primary-400">
                    {p.summary}
                </Description>
            </div>
            {p.children}
        </Field>
    );
}
