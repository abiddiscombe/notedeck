import ExternalLink from "../../components/ExternalLink";
import Typography from "../../components/Typography";
import { APP_INFO } from "../../utilities/constants";

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
