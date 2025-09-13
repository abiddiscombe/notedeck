import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Typography } from "@/components/ui/Typography";
import notes from "@/database/notes";
import { APP_INFO } from "@/utilities/constants";
import { InfoIcon, PlusIcon } from "lucide-react";

export function MainOnboarding() {
  function handleCreateNote() {
    notes.create({
      theme: "yellow",
      content: "This is your first note! Click here to edit.",
      isMonospace: false,
    });
  }

  return (
    <main className="grid place-items-center p-6">
      <div className="max-w-sm">
        <Typography variant="h1">Welcome to {APP_INFO.Name}</Typography>
        <Typography variant="body">
          {APP_INFO.Name} is a free and private sticky notes board with offline
          support. Your notes are stored locally in your browser and never leave
          your device.
        </Typography>
        <div className="mt-8 flex gap-4">
          <Button variant="primary" onClick={() => handleCreateNote()}>
            <Icon>
              <PlusIcon />
            </Icon>
            Get Started
          </Button>
          <Button variant="secondary" asChild>
            <a href={APP_INFO.GitHubRepoUrl} target="_blank">
              <Icon>
                <InfoIcon />
              </Icon>
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
