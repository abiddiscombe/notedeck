import { APP_INFO } from "@/utilities/constants";

const HeaderLogo = () => {
  return (
    <div className="flex-grow select-none">
      <span className="text-sm font-semibold tracking-tight text-neutral-950 dark:text-neutral-100">
        {APP_INFO.Name}
      </span>
    </div>
  );
};

export default HeaderLogo;
