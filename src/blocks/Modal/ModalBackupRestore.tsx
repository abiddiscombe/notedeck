import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { useFilePicker } from "use-file-picker";
import { BackupObject, backup } from "../../utilities/backup";
import { saveAs } from "file-saver";
import { FileSizeValidator } from "use-file-picker/validators";
import { Notice } from "../../components/Notice";
import { useEffect, useState } from "react";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    CheckIcon,
} from "@heroicons/react/16/solid";
import { convertDate } from "../../utilities/convertDate";
import { appInfo } from "../../utilities/constants";

type ModalBackupRestoreProps = {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

export function ModalBackupRestore(p: ModalBackupRestoreProps) {
    const [parsedBackup, setParsedBackup] = useState<BackupObject>();
    const [parsedBackupDate, setParsedBackupDate] = useState({
        date: "",
        hh: "",
        mm: "",
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);

    const { openFilePicker, filesContent, clear } = useFilePicker({
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
            handleCloseModal();
        }
    }

    function handleCloseModal() {
        clear();
        setParsedBackup(undefined);

        // Close the modal.
        p.setIsOpen(false);
    }

    return (
        <Modal
            title={<Typography variant="h2">Backup & Restore</Typography>}
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography variant="body">
                Backup or transfer your notes to a new device, or restore this
                instance of {appInfo.name} to a previous state.
            </Typography>

            <Typography variant="h3">Create Backup</Typography>
            <Typography variant="body">
                Download a snapshot of your notes and settings to restore later.
                Please store your backups somewhere safe.
            </Typography>
            <Button variant="filled" onClick={() => createAndDownloadBackup()}>
                <>
                    {downloadCompleted ? (
                        <CheckIcon className="h-4" />
                    ) : (
                        <ArrowDownTrayIcon className="h-4" />
                    )}
                    Download Backup
                </>
            </Button>

            <Typography variant="h3">Restore from Backup</Typography>
            <Typography variant="body">
                Restore your notes and settings from a previous backup file.
            </Typography>
            <div className="flex items-center gap-4 rounded bg-gray-100">
                <Button variant="filled" onClick={() => openFilePicker()}>
                    <>
                        <ArrowUpTrayIcon className="h-4" />
                        Choose File
                    </>
                </Button>
                <code className="text-sm text-gray-600">
                    {filesContent.length
                        ? filesContent[0].name
                        : "No file selected."}
                </code>
            </div>

            {showErrorMessage && (
                <Notice variant="error">
                    Something went wrong whilst reading the backup file.
                    <br />
                    It may be corrupted or incompatible with NoteDeck.
                </Notice>
            )}

            {!showErrorMessage && !!filesContent.length && parsedBackup && (
                <Notice variant="warning">
                    <Typography variant="body">
                        This backup was created on {parsedBackupDate?.date} at{" "}
                        {parsedBackupDate?.hh}:{parsedBackupDate?.mm}.
                        <br />
                        <strong className="block py-2 font-medium text-gray-800">
                            Are you sure you wish to erase all existing notes
                            and settings
                            {!!parsedBackup?.content.notes.length
                                ? `, and restore ${parsedBackup?.content.notes.length} notes from the backup file?`
                                : "? This backup does not contain any notes."}
                        </strong>
                    </Typography>
                    <Button
                        variant="destructive"
                        onClick={() => restoreContentFromBackup()}
                    >
                        Restore Backup
                    </Button>
                </Notice>
            )}

            <br />

            <Button variant="outlined" onClick={() => handleCloseModal()}>
                Cancel
            </Button>
        </Modal>
    );
}
