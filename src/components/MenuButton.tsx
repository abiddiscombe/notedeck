import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/16/solid";

type MenuButtonProps = {
    icon: React.ReactNode;
    label: string;
    onClick: VoidFunction;
    isActive?: boolean;
    isDisabled?: boolean;
    isDestructive?: boolean;
};

export function MenuButton(p: MenuButtonProps) {
    const styles = {
        button: clsx(
            "group flex w-full items-center gap-3 rounded px-3 py-1.5 duration-150",
            !p.isDisabled && "hover:bg-gray-100 active:bg-gray-200",
            !p.isDisabled &&
                p.isDestructive &&
                "hover:bg-red-600 active:bg-red-500",
        ),
        buttonIcon: clsx(
            "[&>svg]:w-3.5",
            p.isDisabled ? "[&>svg]:text-gray-400" : "[&>svg]:text-gray-500",
            !p.isDisabled &&
                p.isDestructive &&
                "[&>svg]:group-hover:text-white",
        ),
        buttonLabel: clsx(
            "text-sm",
            p.isDisabled ? "text-gray-400" : "text-gray-800",
            !p.isDisabled && p.isDestructive && "group-hover:text-white",
        ),
        buttonActiveIcon: clsx(
            "ml-auto h-5",
            p.isDisabled ? "fill-emerald-200" : "fill-green-600",
        ),
    };

    return (
        <button
            onClick={p.onClick}
            disabled={p.isDisabled}
            className={styles.button}
        >
            <span className={styles.buttonIcon}>{p.icon}</span>
            <span className={styles.buttonLabel}>{p.label}</span>
            {p.isActive && <CheckIcon className={styles.buttonActiveIcon} />}
        </button>
    );
}
