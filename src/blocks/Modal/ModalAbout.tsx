import { appInfo } from "../../utilities/constants";
import { Modal } from "../../components/Modal";
import { Notice } from "../../components/Notice";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { VersionTag } from "../../components/VersionTag";
import { ExternalLink } from "../../components/ExternalLink";

type ModalAboutProps = {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

export function ModalAbout(p: ModalAboutProps) {
    return (
        <Modal
            title={<Typography variant="h2">About {appInfo.name}</Typography>}
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography variant="body">
                {appInfo.name} is a browser app for tracking your thoughts on
                virtual sticky notes, it's great for jotting down quick notes,
                tasks, or code snippets.
            </Typography>
            <Typography variant="body">
                It uses{" "}
                <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
                    IndexedDB
                </ExternalLink>{" "}
                to store your notes and settings locally to your browser
                storage, and does not require a user account.
            </Typography>
            <Typography variant="body">
                Because user data is persisted locally on your device (and not
                synced to the cloud) you must take care to avoid clearing your
                browser's site settings for {appInfo.name}.
            </Typography>
            <Notice>
                <Typography variant="body">
                    "Backup & Restore" functionality is planned as part of
                    future development. This will permit users to download an
                    archived version of their notes at regular intervals.
                </Typography>
            </Notice>
            <Typography variant="small">
                &copy;{" "}
                <ExternalLink href="https://github.com/abiddiscombe">
                    Archie Biddiscombe
                </ExternalLink>{" "}
                2024 -{" "}
                <ExternalLink href={`${appInfo.source}?tab=MIT-1-ov-file`}>
                    MIT License
                </ExternalLink>
            </Typography>
            <div className="mt-8 flex items-center justify-between gap-4">
                <Button variant="filled" onClick={() => p.setIsOpen(false)}>
                    Close
                </Button>
                <VersionTag />
            </div>
        </Modal>
    );
}
