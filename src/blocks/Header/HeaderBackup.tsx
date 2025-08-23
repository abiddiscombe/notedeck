import Tooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { backup } from "@/utilities/backup";
import { convertDate } from "@/utilities/convertDate";
import {
  ArchiveBoxArrowDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/16/solid";
import saveAs from "file-saver";
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
    <Tooltip label={label}>
      <Button
        size="icon"
        aria-label={label}
        onClick={() => handleDownloadBackup()}
      >
        {backupDone ? <CheckCircleIcon /> : <ArchiveBoxArrowDownIcon />}
      </Button>
    </Tooltip>
  );
};

export default HeaderBackup;
