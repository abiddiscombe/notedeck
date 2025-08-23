import { Description, Field, Label } from "@headlessui/react";

const ItemContainer = (p: {
  label: string;
  summary: string;
  children: React.ReactNode;
}) => {
  return (
    <Field className="mb-4 mt-2 flex items-start justify-between gap-6">
      <div className="max-w-sm">
        <Label passive className="text-neutral-800 dark:text-neutral-200">
          {p.label}
        </Label>
        <Description className="text-pretty text-xs text-neutral-500 dark:text-neutral-400">
          {p.summary}
        </Description>
      </div>
      {p.children}
    </Field>
  );
};

export default ItemContainer;
