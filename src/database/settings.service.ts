import { SettingItem, db } from "./db";
import { SETTINGS_KEYS, TABLE_NAMES } from "../utilities/constants";

const read = async (targetKey: string) => {
  const results = await db
    .table(TABLE_NAMES.Settings)
    .where({
      key: targetKey,
    })
    .toArray();

  if (!results.length) {
    throw new Error("Key Not Found");
  }

  return results[0]?.value;
};

const write = async (targetKey: string, targetValue: boolean) => {
  return await db
    .table(TABLE_NAMES.Settings)
    .where({
      key: targetKey,
    })
    .modify({
      value: targetValue,
    });
};

const exportAll = async () => {
  return await db.table(TABLE_NAMES.Settings).toArray();
};

const importAll = async (importContent: SettingItem[]) => {
  await db.transaction("rw", db.table(TABLE_NAMES.Settings), () => {
    db.table(TABLE_NAMES.Settings).clear();
    db.table(TABLE_NAMES.Settings).bulkAdd(importContent);
  });
};

const instantiate = async () => {
  const defaultValues = [
    {
      key: SETTINGS_KEYS.UseOpaqueNotes,
      value: false,
    },
    {
      key: SETTINGS_KEYS.HideNonPriorityNotes,
      value: false,
    },
  ];

  for (const defaultValue of defaultValues) {
    try {
      await db.table(TABLE_NAMES.Settings).add(defaultValue);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name !== "ConstraintError") {
          throw error;
        }
      }
    }
  }
};

export const settingsService = {
  read,
  write,
  exportAll,
  importAll,
  instantiate,
};
