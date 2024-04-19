import { appInfo } from "../../utilities/constants";
import { Modal } from "../../components/Modal";
import { Typography } from "../../components/elements/Typography";
import { Tag } from "../../components/elements/Tag";
import { ExternalLink } from "../../components/ExternalLink";
import { Notice } from "../../components/elements/Notice";

type ModalAboutProps = {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};

export function ModalAbout(p: ModalAboutProps) {
    return (
        <Modal
            title={`About ${appInfo.name}`}
            isOpen={p.isOpen}
            setIsOpen={p.setIsOpen}
        >
            <Typography.Body>
                {appInfo.name} is a browser app for tracking your thoughts on
                virtual sticky notes, it's great for jotting down quick notes,
                tasks, or code snippets.
            </Typography.Body>
            <Notice variant="warning">
                <Typography.Body noMargin={true}>
                    {appInfo.name} uses{" "}
                    <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
                        IndexedDB
                    </ExternalLink>{" "}
                    to store notes and settings locally to your device. Please
                    take care to make regular backups, and avoid clearing your
                    browser's site settings.
                </Typography.Body>
            </Notice>
            <div className="mt-8 flex items-center justify-between gap-4">
                <Typography.Body>
                    <small>
                        &copy;{" "}
                        <ExternalLink href="https://github.com/abiddiscombe">
                            Archie Biddiscombe
                        </ExternalLink>{" "}
                        2024 -{" "}
                        <ExternalLink href={appInfo.source}>
                            View Source
                        </ExternalLink>
                    </small>
                </Typography.Body>
                <Tag
                    variant="minimal"
                    monospace={true}
                >
                    v{appInfo.semVer}
                </Tag>
            </div>
        </Modal>
    );
}
