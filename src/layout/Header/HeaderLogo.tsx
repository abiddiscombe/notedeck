import { appInfo } from "../../utilities/constants";
import { Typography } from "../../components/Typography";

export function HeaderLogo() {
    return (
        <div className="flex flex-grow select-none items-baseline gap-2">
            <Typography.H1 noMargin={true}>{appInfo.name}</Typography.H1>
            <Typography.Body
                noMargin={true}
                className="text-[0.7rem] text-primary-400 dark:text-primary-500"
            >
                v{appInfo.semVer}
            </Typography.Body>
        </div>
    );
}
