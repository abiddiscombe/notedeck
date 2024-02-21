import { Typography } from "../../components/Typography";
import { appName } from "../../utilities/constants";

export function HeaderLogo() {
    return <Typography variant="h1">{appName}</Typography>;
}
