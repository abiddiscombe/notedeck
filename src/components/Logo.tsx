import clsx from "clsx";
import { appInfo } from "../utilities/constants";

type LogoProps = {
    large?: boolean;
    faded?: boolean;
    flexGrow?: boolean;
};

export function Logo(p: LogoProps) {
    return (
        <h1
            className={clsx(
                "select-none tracking-tight",
                p.flexGrow && "grow",
                p.faded ? "text-gray-500" : "text-gray-800",
                p.large ? "text-2xl font-light" : "font-semibold",
            )}
        >
            {appInfo.name}
        </h1>
    );
}
