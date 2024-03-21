import { appInfo } from "../../utilities/constants";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { Typography } from "../../components/Typography";
import { VersionTag } from "../../components/VersionTag";
import { ExternalLink } from "../../components/ExternalLink";
import { Notice } from "../../components/Notice";

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
            <Notice variant="info">
                <Typography variant="body" noMargin>
                    {appInfo.name} uses{" "}
                    <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
                        IndexedDB
                    </ExternalLink>{" "}
                    to store notes and settings locally to your device. Please
                    take care to make regular backups, and avoid clearing your
                    browser's site settings.
                </Typography>
            </Notice>
            <Typography variant="body">
                <small>
                    &copy;{" "}
                    <ExternalLink href="https://github.com/abiddiscombe">
                        Archie Biddiscombe
                    </ExternalLink>{" "}
                    2024 -{" "}
                    <ExternalLink href={`${appInfo.source}?tab=MIT-1-ov-file`}>
                        MIT License
                    </ExternalLink>
                </small>
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
