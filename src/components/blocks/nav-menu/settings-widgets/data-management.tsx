import { Button } from "@/components/elements/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/elements/dialog";
import { Icon } from "@/components/elements/icon";
import { Toolset } from "@/components/elements/toolset";
import * as services from "@/database/services";
import {
  BackupObject,
  createBackup,
  restoreBackup,
  unpackBackup,
} from "@/utilities/backup";
import { useLiveQuery } from "dexie-react-hooks";
import saveAs from "file-saver";
import { DownloadIcon, PackageCheckIcon, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";

export const Settings_DataManagement = ({
  closeHostDialog,
}: {
  closeHostDialog: () => void;
}) => {
  const notes = useLiveQuery(() => services.notes.getAll());
  const [backupData, setBackupData] = useState<BackupObject>();
  const [errorEmptyFile, setErrorEmptyFile] = useState<boolean>(false);
  const [errorCorruptedFile, setErrorCorruptedFile] = useState<boolean>(false);

  const { openFilePicker, filesContent } = useFilePicker({
    multiple: false,
    accept: ".json",
    validators: [new FileSizeValidator({ maxFileSize: 1000000 })],
  });

  useEffect(() => {
    if (filesContent.length) {
      /**
       * A file has been loaded and we
       * can process it / check for issues.
       */

      try {
        const _backupData = unpackBackup(filesContent[0].content);

        if (_backupData.content.notes.length === 0) {
          setErrorEmptyFile(true);
          return;
        }

        setBackupData(_backupData);
      } catch {
        setErrorCorruptedFile(true);
      }
    }
  }, [filesContent]);

  const handleTeardown = () => {
    setBackupData(undefined);
    setErrorEmptyFile(false);
    setErrorCorruptedFile(false);
  };

  const handleDownloadBackup = async () => {
    const date = new Date();
    const YYYY = date.getFullYear();
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const DD = ("0" + date.getDate()).slice(-2);
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);

    const fileName = `notedeck--${YYYY}-${MM}-${DD}-${hh}-${mm}.json`;

    saveAs(await createBackup(), fileName);
  };

  const handleSelectBackupFile = () => {
    handleTeardown();
    openFilePicker();
  };

  const handleRestoreBackupFile = async () => {
    if (!backupData) {
      return;
    }

    await restoreBackup(backupData);

    /**
     * Adding a slight delay to the process
     * cleanup and dialog close gives nicer UX.
     */

    setTimeout(() => {
      handleTeardown();
      closeHostDialog();
    }, 200);
  };

  return (
    <>
      <p className="mb-4">
        Create a backup of your notes to restore them from later, or to transfer
        to a new device.
      </p>
      <Toolset axis="y">
        <Button
          icon={
            <Icon>
              <DownloadIcon />
            </Icon>
          }
          disabled={!notes?.length}
          onClick={handleDownloadBackup}
        >
          Download Backup
        </Button>
        <Button
          icon={
            <Icon>
              <UploadIcon />
            </Icon>
          }
          onClick={handleSelectBackupFile}
        >
          Restore Existing Backup
        </Button>
      </Toolset>
      {errorEmptyFile && (
        <p className="mt-4 text-sm text-orange-500!">
          The selected backup file is empty. Please choose a different file.
        </p>
      )}
      {errorCorruptedFile && (
        <p className="mt-4 text-sm text-red-500!">
          Sorry, something went wrong whilst reading the backup file. It may be
          corrupted.
        </p>
      )}

      <Dialog
        open={Boolean(
          !errorEmptyFile &&
            !errorCorruptedFile &&
            Boolean(backupData?.content.notes.length),
        )}
      >
        <DialogOverlay onClick={handleTeardown} />
        <DialogContent align="center" title="Restore Backup File">
          <h2 className="mb-4 text-lg">Restore Notes from Backup</h2>
          <div className="bg-base-100 dark:bg-base-700 text-base-700 dark:text-base-200 mb-4 overflow-hidden rounded px-2 py-1 font-mono text-xs text-ellipsis">
            <code>{filesContent[0]?.name}</code>
          </div>
          <p className="mb-2">
            The selected backup file contains{" "}
            {backupData?.content.notes?.length} notes and was created on the{" "}
            {new Date(backupData?.timestamp ?? 0).toLocaleDateString("en-gb", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
          <p className="mb-4">
            Restoring this backup will erase all existing notes.
          </p>
          <Toolset className="mt-8">
            <Button
              icon={
                <Icon>
                  <PackageCheckIcon />
                </Icon>
              }
              variant="solid"
              onClick={handleRestoreBackupFile}
            >
              Restore Notes
            </Button>
            <Button onClick={handleTeardown}>Cancel</Button>
          </Toolset>
        </DialogContent>
      </Dialog>
    </>
  );
};
