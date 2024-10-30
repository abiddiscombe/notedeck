import db, { TABLE_NAMES } from "./db";

enum SETTINGS_KEYS {
  UseOpaqueNotes = "useOpaqueNotes",
  HideNonPriorityNotes = "hideNonPriorityNotes",
}

async function _fetchItems(query: { key: string }) {
  const results = await db.table(TABLE_NAMES.Settings).where(query).toArray();
  return results;
}

async function read(key: string) {
  const query = { key: key };
  const result = await _fetchItems(query);

  if (result.length === 0) {
    // Return default KVP.

    switch (key) {
      case SETTINGS_KEYS.UseOpaqueNotes:
        return false;
      case SETTINGS_KEYS.HideNonPriorityNotes:
        return false;
      default:
        console.error("Read Settings Request - Unknown Key");
    }
  }

  return result[0].value as boolean;
}

async function write(key: string, value: boolean) {
  const query = { key: key };
  const change = { value: value };

  const exists = Boolean((await _fetchItems(query)).length);
  if (exists) {
    const result = await db
      .table(TABLE_NAMES.Settings)
      .where(query)
      .modify(change);
    return result;
  }

  const result = await db
    .table(TABLE_NAMES.Settings)
    .add({ ...query, ...change });
  return result;
}

export { SETTINGS_KEYS };
export default { read, write };
