import { APP_INFO } from "../../utilities/constants";
import Typography from "../../components/Typography";

export default () => {
    return (
        <div className="flex flex-grow select-none items-baseline gap-2">
            <Typography
                variant="h1"
                noMargin={true}
            >
                {APP_INFO.Name}
            </Typography>
            <Typography
                variant="body"
                noMargin={true}
                className="hidden text-[0.7rem] text-primary-700 sm:block dark:text-primary-200"
            >
                v{APP_INFO.SemVer}
            </Typography>
        </div>
    );
};
