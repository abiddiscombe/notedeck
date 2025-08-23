import { Checkbox as _Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";

const Checkbox = (
  p: React.HTMLAttributes<HTMLSpanElement> & {
    state: boolean;
    setState: VoidFunction;
  },
) => {
  return (
    <_Checkbox
      checked={p.state}
      onChange={() => p.setState()}
      className={twMerge(
        "group size-5 cursor-pointer rounded border border-neutral-200 p-0.5 data-[checked]:border-neutral-800 data-[checked]:bg-neutral-800 data-[hover]:shadow-sm dark:border-neutral-700 dark:data-[checked]:border-neutral-500 dark:data-[checked]:bg-neutral-600 dark:data-[checked]:data-[hover]:bg-neutral-500",
        p.className,
      )}
    >
      <CheckIcon className="size-3.5 fill-neutral-100 opacity-0 transition-opacity group-data-[checked]:opacity-100" />
    </_Checkbox>
  );
};

export default Checkbox;
