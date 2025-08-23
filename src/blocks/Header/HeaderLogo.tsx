import Typography from "@/components/Typography";
import { APP_INFO } from "@/utilities/constants";

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
