import { twMerge } from "tailwind-merge";
import { Switch as _Switch } from "@headlessui/react";

const Switch = (
  p: React.HTMLAttributes<HTMLElement> & {
    state: boolean;
    setState: (newState: boolean) => void;
  },
) => {
  return (
    <_Switch
      {...p}
      checked={p.state}
      onChange={() => p.setState(!p.state)}
      className={twMerge(
        "group inline-flex h-5 w-9 items-center rounded-full bg-primary-200 transition data-[checked]:bg-green-500 data-[checked]:data-[hover]:bg-green-600 data-[hover]:bg-primary-300 dark:bg-primary-600 dark:data-[hover]:bg-primary-700",
        p.className,
      )}
    >
      <span className="size-3 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-5" />
    </_Switch>
  );
};

export default Switch;
