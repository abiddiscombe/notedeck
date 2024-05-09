import { appInfo } from "../../utilities/constants";
import { Tag } from "../../components/elements/Tag";
import { Notice } from "../../components/elements/Notice";
import { ExternalLink } from "../../components/ExternalLink";
import { Typography } from "../../components/elements/Typography";

export function SettingsAbout() {
    return (
        <>
            <Typography.Body>
                {appInfo.name} is a browser app for recording your thoughts,
                meeting notes, or code snippets using virtual sticky notes. It
                is open source and respects your privacy. Your data never leaves
                your device and is persisted in your web browser.
            </Typography.Body>
            <Notice variant="warning">
                <Typography.Body noMargin={true}>
                    {appInfo.name} uses the{" "}
                    <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
                        IndexedDB
                    </ExternalLink>{" "}
                    API to store data locally on your device. Please make
                    regular backups and avoid clearing your browser's site
                    settings.
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
        </>
    );
}