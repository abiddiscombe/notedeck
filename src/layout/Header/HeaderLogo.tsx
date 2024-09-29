import { APP_INFO } from "../../utilities/constants";
import Typography from "../../components/Typography";

const HeaderLogo = () => {
  return (
    <div className="flex-grow select-none">
      <Typography variant="h1" noMargin={true}>
        {APP_INFO.Name}
      </Typography>
    </div>
  );
};

export default HeaderLogo;
