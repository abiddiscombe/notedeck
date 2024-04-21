import { db, TABLE_SETTINGS, SettingItem } from "./db";

export const serviceSettings = {
    read: _read,
    write: _write,
    instantiate: _instantiate,
};

async function _read() {
    const results = await db.table(TABLE_SETTINGS).toArray();
    return results[0]?.content;
}

async function _write(kvp: SettingItem["content"]) {
    const results = await db.table(TABLE_SETTINGS).toArray();

    await db.table(TABLE_SETTINGS).update(results[0].id, {
        content: {
            ...results[0].content,
            ...kvp,
        },
    });
}

async function _instantiate() {
    const defaultSettings: SettingItem["content"] = {
        useOpaqueNotes: false,
    };

    await db.table(TABLE_SETTINGS).add({
        content: defaultSettings,
    });
}
