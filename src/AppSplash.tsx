import { APP_INFO } from "./utilities/constants";
import Spinner from "./components/Spinner";
import Typography from "./components/Typography";

const AppSplash = () => {
    return (
        <div className="grid h-screen place-items-center bg-primary-50 dark:bg-primary-950">
            <div className="text-center">
                <Typography
                    variant="h1"
                    className="text-2xl"
                >
                    {APP_INFO.Name}
                </Typography>
                <Spinner />
            </div>
        </div>
    );
};

export default AppSplash;
