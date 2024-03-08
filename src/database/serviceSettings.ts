import { db, TABLE_SETTINGS } from "./db";
import { appSettings } from "../utilities/constants";

export const serviceSettings = {
    read: _read,
    write: _write,
    instantiate: _instantiate,
};

async function _read() {
    const results = await db.table(TABLE_SETTINGS).toArray();
    return results[0]?.content;
}

async function _write(kvp: appSettings) {
    const results = await db.table(TABLE_SETTINGS).toArray();
    await db.table(TABLE_SETTINGS).update(results[0].id, {
        content: {
            ...results[0].content,
            ...kvp,
        },
    });
}

async function _instantiate() {
    const defaultSettings: appSettings = {
        useOpaqueNotes: false,
    };

    await db.table(TABLE_SETTINGS).add({
        content: defaultSettings,
    });
}
