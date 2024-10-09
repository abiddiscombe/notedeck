import { APP_INFO } from "./constants";

const check = async () => {
  try {
    const res = await fetch(APP_INFO.ReleasesUrl, {
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) {
      throw new Error();
    }

    const resJson = await res.json();
    const latestRelease = resJson[0].tag_name;
    return {
      updateAvailable: latestRelease !== `v${APP_INFO.SemVer}`,
      updateTargetVersion: latestRelease,
    };
  } catch {
    console.warn("Update Check Failed");
    return {
      updateAvailable: false,
      updateTargetVersion: "",
    };
  }
};

export const update = {
  check,
};
