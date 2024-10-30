import { APP_INFO } from "../../utilities/constants";
import Typography from "../../components/elements/Typography";

const HeaderLogo = () => {
  return (
    <div className="flex-grow select-none">
      <Typography variant="h1">{APP_INFO.Name}</Typography>
    </div>
  );
};

export default HeaderLogo;
