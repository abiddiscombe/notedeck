import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
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
    <main className="grid place-items-center p-6 transition">
      <div className="flex max-w-2xl flex-col items-center">
        <h1 className="text-center">Your Thoughts. Your Space.</h1>
        <p className="max-w-md text-center">
          {APP_INFO.Name} is a free sticky notes board that works offline. Your
          notes are saved in your browser and <strong>never</strong> leave your
          device.
        </p>
        <div className="mt-4 flex gap-4">
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
