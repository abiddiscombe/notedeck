import { useState } from "react";
import saveAs from "file-saver";
import {
    ArchiveBoxArrowDownIcon,
    CheckCircleIcon,
} from "@heroicons/react/16/solid";
import { backup } from "../../utilities/backup";
import { convertDate } from "../../utilities/convertDate";
import Button from "../../components/Button";
import Tooltip from "../../components/Tooltip";

export default () => {
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
                size="sm"
                variant="ghost"
                aria-label={label}
                className="bg-primary-50 dark:bg-primary-800"
                onClick={() => handleDownloadBackup()}
            >
                {backupDone ? <CheckCircleIcon /> : <ArchiveBoxArrowDownIcon />}
            </Button>
        </Tooltip>
    );
};
