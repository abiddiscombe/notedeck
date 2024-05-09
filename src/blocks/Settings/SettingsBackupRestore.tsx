import { useEffect, useState } from "react";
import { convertDate } from "../../utilities/convertDate";
import { BackupObject, backup } from "../../utilities/backup";
import { Button } from "../../components/elements/Button";
import { Notice } from "../../components/elements/Notice";
import { Typography } from "../../components/elements/Typography";
import { appInfo } from "../../utilities/constants";
import { saveAs } from "file-saver";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    CheckIcon,
    DocumentCheckIcon,
} from "@heroicons/react/16/solid";

export function SettingsBackupRestore() {
    const [parsedBackup, setParsedBackup] = useState<BackupObject>();
    const [parsedBackupDate, setParsedBackupDate] = useState({
        date: "",
        hh: "",
        mm: "",
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);

    const { openFilePicker, filesContent } = useFilePicker({
        multiple: false,
        accept: ".json",
        validators: [new FileSizeValidator({ maxFileSize: 5000000 })],
    });

    useEffect(() => {
        if (filesContent.length) {
            try {
                const backupRaw = filesContent[0].content;
                const backupParsed = backup.unpack(backupRaw);
                const backupParsedDate = convertDate(backupParsed.timestamp);
                setParsedBackup(backupParsed);
                setParsedBackupDate(backupParsedDate);
                setShowErrorMessage(false);
            } catch {
                setShowErrorMessage(true);
            }
        }
    }, [filesContent]);

    async function createAndDownloadBackup() {
        const parsedDate = convertDate();
        const content = await backup.create();
        const fileName = `notedeck--${parsedDate.date}-${parsedDate.hh}-${parsedDate.mm}.json`;
        saveAs(content, fileName);

        // Show and then hide the <Check /> with
        // artificial delays.
        setTimeout(() => setDownloadCompleted(true), 500);
        setTimeout(() => setDownloadCompleted(false), 10500);
    }

    async function restoreContentFromBackup() {
        if (parsedBackup) {
            await backup.restore(parsedBackup);
        }
    }

    return (
        <>
            <Typography.H3 className="mt-0">Create Backup</Typography.H3>
            <Typography.Body>
                Download a snapshot of your notes and settings to restore from
                later. Please store your backups somewhere safe.
            </Typography.Body>
            <Button
                variant="solid"
                onClick={() => createAndDownloadBackup()}
            >
                {downloadCompleted ? <CheckIcon /> : <ArrowDownTrayIcon />}
                Download Backup
            </Button>
            <Typography.H3>Restore from Backup</Typography.H3>
            <Typography.Body>
                Restore your notes and settings from a backup file.
            </Typography.Body>
            <div className="flex items-center gap-4 rounded bg-primary-100 dark:bg-primary-700">
                <Button
                    variant="solid"
                    onClick={() => openFilePicker()}
                    className="rounded-r-none pr-4"
                >
                    <>
                        <ArrowUpTrayIcon />
                        Choose File
                    </>
                </Button>
                <code className="text-sm text-primary-600 dark:text-primary-400">
                    {filesContent.length
                        ? filesContent[0].name
                        : "No file selected."}
                </code>
            </div>

            {showErrorMessage && (
                <Notice variant="error">
                    Something went wrong whilst reading the backup file.
                    <br />
                    It may be corrupted or incompatible with {appInfo.name}.
                </Notice>
            )}

            {!showErrorMessage && !!filesContent.length && parsedBackup && (
                <Notice variant="warning">
                    <Typography.Body>
                        This backup was created on {parsedBackupDate?.date} at{" "}
                        {parsedBackupDate?.hh}:{parsedBackupDate?.mm}.
                        <br />
                        <strong className="block py-2 font-medium">
                            Are you sure you wish to erase all existing notes
                            and settings
                            {parsedBackup?.content.notes.length
                                ? `, and restore ${parsedBackup?.content.notes.length} notes from the backup file?`
                                : "? This backup does not contain any notes."}
                        </strong>
                    </Typography.Body>
                    <Button
                        variant="destructive"
                        onClick={() => restoreContentFromBackup()}
                    >
                        <>
                            <DocumentCheckIcon />
                            Restore Backup
                        </>
                    </Button>
                </Notice>
            )}
        </>
    );
}
