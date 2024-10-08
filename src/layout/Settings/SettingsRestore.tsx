import { useEffect, useState } from "react";
import { convertDate } from "../../utilities/convertDate";
import { BackupObject, backup } from "../../utilities/backup";
import Button from "../../components/Button";
import Notice from "../../components/Notice";
import Typography from "../../components/Typography";
import { APP_INFO } from "../../utilities/constants";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { ArrowUpTrayIcon, DocumentCheckIcon } from "@heroicons/react/16/solid";

const SettingsRestore = () => {
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
        const backupParsedDate = convertDate(backupParsed.timestamp);
        setParsedBackup(backupParsed);
        setParsedBackupDate(backupParsedDate);
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
      <Typography variant="body">
        Restore your notes and settings to a previous state.
      </Typography>
      <div className="mt-4 flex items-center gap-4 rounded bg-primary-100 dark:bg-primary-700">
        <Button
          variant="solid"
          onClick={() => openFilePicker()}
          className="shrink-0 rounded-r-none pr-4"
        >
          <ArrowUpTrayIcon />
          Select File
        </Button>
        <div className="overflow-hidden text-ellipsis pr-4 text-xs text-primary-700 dark:text-primary-200">
          {filesContent.length ? (
            <span className="font-mono">{filesContent[0].name}</span>
          ) : (
            <span>No file selected.</span>
          )}
        </div>
      </div>

      {showErrorMessage && (
        <Notice variant="error">
          Something went wrong whilst reading the backup file.
          <br />
          It may be corrupted or incompatible with {APP_INFO.Name}.
        </Notice>
      )}

      {!showErrorMessage && !!filesContent.length && parsedBackup && (
        <Notice variant="warning">
          <Typography variant="body">
            This backup was created on {parsedBackupDate?.date} at{" "}
            {parsedBackupDate?.hh}:{parsedBackupDate?.mm}.
            <br />
            <strong className="block py-2 font-medium">
              Are you sure you wish to erase all existing notes and settings
              {parsedBackup?.content.notes.length
                ? `, and restore ${parsedBackup?.content.notes.length} notes from the backup file?`
                : "? This backup does not contain any notes."}
            </strong>
          </Typography>
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

      {showSuccessMessage && (
        <Notice variant="success">
          <strong>Restore successful.</strong>
          <br />
          Close this dialog to view your restored notes.
        </Notice>
      )}
    </div>
  );
};

export default SettingsRestore;
