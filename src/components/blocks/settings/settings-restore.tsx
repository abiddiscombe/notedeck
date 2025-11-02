import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import { Notice } from "@/components/elements/notice";
import { BackupObject, backup } from "@/utilities/backup";
import { CheckIcon, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";

export function SettingsRestore() {
  const [parsedBackup, setParsedBackup] = useState<BackupObject>();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [parsedBackupDate, setParsedBackupDate] = useState({
    date: "",
    hh: "",
    mm: "",
  });

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

        const date = new Date(backupParsed.timestamp);
        const YYYY = date.getFullYear();
        const MM = ("0" + (date.getMonth() + 1)).slice(-2);
        const DD = ("0" + date.getDate()).slice(-2);
        const hh = ("0" + date.getHours()).slice(-2);
        const mm = ("0" + date.getMinutes()).slice(-2);

        setParsedBackup(backupParsed);
        setParsedBackupDate({
          hh: hh,
          mm: mm,
          date: `${YYYY}-${MM}-${DD}`,
        });
        setShowErrorMessage(false);
      } catch {
        setShowErrorMessage(true);
      }
    }
    setShowSuccessMessage(false);
  }, [filesContent]);

  async function restoreContentFromBackup() {
    if (parsedBackup) {
      await backup.restore(parsedBackup);
    }
    setParsedBackup(undefined);
    setShowSuccessMessage(true);
  }

  return (
    <div className="mt-4">
      <p>Restore your notes and settings to a previous state.</p>
      <div className="bg-base-100 dark:bg-base-700 my-4 flex items-center gap-4 rounded">
        <Button
          icon={
            <Icon>
              <UploadIcon />
            </Icon>
          }
          variant="primary"
          onClick={() => openFilePicker()}
          className="shrink-0 rounded-r-none pr-4"
        >
          Select File
        </Button>
        <div className="text-base-700 dark:text-base-200 overflow-hidden pr-4 text-xs text-ellipsis">
          {filesContent.length ? (
            <span className="font-mono">{filesContent[0].name}</span>
          ) : (
            <span>No file selected.</span>
          )}
        </div>
      </div>

      {showErrorMessage && (
        <Notice variant="error">
          Something went wrong whilst reading the backup file. It may be
          corrupted or incompatible with NoteDeck.
        </Notice>
      )}

      {!showErrorMessage && !!filesContent.length && parsedBackup && (
        <Notice variant="warning">
          <p>
            This backup was created on {parsedBackupDate?.date} at{" "}
            {parsedBackupDate?.hh}:{parsedBackupDate?.mm}.
          </p>
          <p>
            Are you sure you wish to erase all existing notes and settings
            {parsedBackup?.content.notes.length
              ? `, and restore ${parsedBackup?.content.notes.length} notes from the backup file?`
              : "? This backup does not contain any notes."}
          </p>
          <Button
            icon={
              <Icon>
                <CheckIcon />
              </Icon>
            }
            variant="primary"
            onClick={() => restoreContentFromBackup()}
          >
            Restore Backup
          </Button>
        </Notice>
      )}

      {showSuccessMessage && (
        <Notice variant="success">
          Restore successful. Close this dialog to view your restored notes.
        </Notice>
      )}
    </div>
  );
}
