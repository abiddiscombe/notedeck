import { appInfo } from "../../utilities/constants";
import { Typography } from "../../components/elements/Typography";

export function HeaderLogo() {
    return (
        <Typography.H1
            noMargin={true}
            className="flex-grow select-none"
        >
            {appInfo.name}
        </Typography.H1>
    );
}
