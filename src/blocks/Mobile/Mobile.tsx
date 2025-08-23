import { APP_INFO } from "../../utilities/constants";
import Typography from "../../components/Typography";
import ExternalLink from "../../components/ExternalLink";

function Mobile() {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] bg-neutral-50 dark:bg-neutral-950">
      <header className="p-10">
        <Typography variant="h1">{APP_INFO.Name}</Typography>
      </header>
      <main className="m-auto max-w-sm p-10 pb-20">
        <Typography variant="h2">
          Sorry, mobile devices are not supported :/
        </Typography>
        <Typography variant="body">
          To explore {APP_INFO.Name}, open this page on your desktop or laptop.
        </Typography>
        <Typography variant="body" className="mt-6">
          <ExternalLink href={APP_INFO.GitHubRepoUrl}>
            Learn more about NoteDeck.
          </ExternalLink>
        </Typography>
      </main>
    </div>
  );
}

export default Mobile;
