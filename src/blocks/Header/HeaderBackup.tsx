import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/core/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { backup } from "@/utilities/backup";
import { convertDate } from "@/utilities/convertDate";
import saveAs from "file-saver";
import { CheckIcon, DownloadIcon } from "lucide-react";
import { useState } from "react";

const HeaderBackup = () => {
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
          size="icon"
          aria-label={label}
          onClick={() => handleDownloadBackup()}
        >
          <Icon>{backupDone ? <CheckIcon /> : <DownloadIcon />}</Icon>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
};

export default HeaderBackup;
