import { appInfo } from "./utilities/constants";
import { Spinner } from "./components/Spinner";
import { Typography } from "./components/Typography";

export function AppSplash() {
    return (
        <div className="grid h-screen place-items-center bg-primary-50 dark:bg-primary-950">
            <div className="text-center">
                <Typography.H1 className="text-2xl">
                    {appInfo.name}
                </Typography.H1>
                <Spinner />
            </div>
        </div>
    );
}
