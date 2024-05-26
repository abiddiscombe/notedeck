import { SettingItem, db } from "./db";

export const serviceSettings = {
    read,
    write,
    exportAll,
    importAll,
    instantiate,
};

async function read(targetKey: string) {
    const results = await db.settings
        .where({
            key: targetKey,
        })
        .toArray();

    if (!results.length) {
        throw new Error("Key Not Found");
    }

    return results[0]?.value;
}

async function write(targetKey: string, targetValue: boolean) {
    const results = await db.settings
        .where({
            key: targetKey,
        })
        .modify({
            value: targetValue,
        });

    return results;
}

async function exportAll() {
    const results = await db.settings.toArray();
    return results;
}

async function importAll(importContent: SettingItem[]) {
    await db.transaction("rw", db.settings, () => {
        db.settings.clear();
        db.settings.bulkAdd(importContent);
    });
}

async function instantiate() {
    const defaultValues = [
        {
            key: "useOpaqueNotes",
            value: false,
        },
        {
            key: "autoUpdateCheck",
            value: true,
        },
    ];

    for (const defaultValue of defaultValues) {
        try {
            await db.settings.add(defaultValue);
        } catch (error: any) {
            if (error.name !== "ConstraintError") {
                throw error;
            }
        }
    }
}
