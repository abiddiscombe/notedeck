import { appInfo } from "./constants";

export const update = {
    check,
};

async function check() {
    const res = await fetch(appInfo.releasesUrl);

    if (!res.ok) {
        return {
            updateAvailable: false,
            updateTargetVersion: "",
        };
    }

    const resJson = await res.json();
    const latestRelease = resJson[0].tag_name;
    return {
        updateAvailable: latestRelease !== `v${appInfo.semVer}`,
        updateTargetVersion: latestRelease,
    };
}
