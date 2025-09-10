import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { APP_INFO } from "@/utilities/constants";

export function Mobile() {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr] bg-neutral-50 dark:bg-neutral-950">
      <header className="p-10">
        <span className="text-sm font-semibold tracking-tight text-neutral-950 dark:text-neutral-100">
          {APP_INFO.Name}
        </span>
      </header>
      <main className="m-auto max-w-sm p-10 pb-20">
        <Typography variant="h2">
          Sorry, mobile devices are not supported :/
        </Typography>
        <Typography variant="body">
          To explore {APP_INFO.Name}, open this page on your desktop or laptop.
        </Typography>
        <Typography variant="body" className="mt-6">
          <Link href={APP_INFO.GitHubRepoUrl} target="_blank">
            Learn more about NoteDeck.
          </Link>
        </Typography>
      </main>
    </div>
  );
}
