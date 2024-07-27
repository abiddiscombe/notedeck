import { APP_INFO } from "./constants";

const check = async () => {
    const res = await fetch(APP_INFO.ReleasesUrl);

    if (!res.ok) {
        return {
            updateAvailable: false,
            updateTargetVersion: "",
        };
    }

    const resJson = await res.json();
    const latestRelease = resJson[0].tag_name;
    return {
        updateAvailable: latestRelease !== `v${APP_INFO.SemVer}`,
        updateTargetVersion: latestRelease,
    };
};

export const update = {
    check,
};
