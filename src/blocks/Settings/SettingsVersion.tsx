import { APP_INFO } from "../../utilities/constants";
import Typography from "../../components/Typography";
import ExternalLink from "../../components/ExternalLink";

const SettingsVersion = () => {
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <Typography variant="body">
        {APP_INFO.Name} v{APP_INFO.SemVer}
      </Typography>
      <Typography variant="body">
        <ExternalLink href={APP_INFO.GitHubRepoUrl}>
          View on GitHub
        </ExternalLink>
      </Typography>
    </div>
  );
};

export default SettingsVersion;
