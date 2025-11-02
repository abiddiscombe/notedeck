import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import { backup } from "@/utilities/backup";
import saveAs from "file-saver";
import { CheckIcon, DownloadIcon } from "lucide-react";
import { useState } from "react";

export function HeaderBackup() {
  const [backupDone, setBackupDone] = useState(false);
  const label = "Download Backup";

  async function handleDownloadBackup() {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const DD = ("0" + date.getDate()).slice(-2);
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);

    const fileName = `notedeck--${YYYY}-${MM}-${DD}-${hh}-${mm}.json`;

    const content = await backup.create();
    saveAs(content, fileName);
    setBackupDone(true);
    setTimeout(() => setBackupDone(false), 1500);
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          icon={<Icon>{backupDone ? <CheckIcon /> : <DownloadIcon />}</Icon>}
          aria-label={label}
          onClick={() => handleDownloadBackup()}
        />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
