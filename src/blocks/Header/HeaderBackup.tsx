import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { backup } from "@/utilities/backup";
import { convertDate } from "@/utilities/convertDate";
import saveAs from "file-saver";
import { CheckIcon, DownloadIcon } from "lucide-react";
import { useState } from "react";

export function HeaderBackup() {
  const [backupDone, setBackupDone] = useState(false);
  const label = "Download Backup";

  async function handleDownloadBackup() {
    const parsedDate = convertDate();
    const fileName = `notedeck--${parsedDate.date}-${parsedDate.hh}-${parsedDate.mm}.json`;
    const content = await backup.create();
    saveAs(content, fileName);
    setBackupDone(true);
    setTimeout(() => setBackupDone(false), 1500);
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          ratio="square"
          aria-label={label}
          onClick={() => handleDownloadBackup()}
        >
          <Icon>{backupDone ? <CheckIcon /> : <DownloadIcon />}</Icon>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
