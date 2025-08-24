import Typography from "@/components/Typography";
import { Link } from "@/components/ui/link";
import { APP_INFO } from "@/utilities/constants";

const SettingsVersion = () => {
  return (
    <div className="mt-4 flex items-center justify-between text-sm">
      <Typography variant="body">
        {APP_INFO.Name} v{APP_INFO.SemVer}
      </Typography>
      <Typography variant="body">
        <Link href={APP_INFO.GitHubRepoUrl} target="_blank">
          View on GitHub
        </Link>
      </Typography>
    </div>
  );
};

export default SettingsVersion;
