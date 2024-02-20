import { IndexableType } from "dexie";
import { NoteModifyableFields, database } from "./database";

export const noteService = {
    list: _list,
    create: _create,
    modify: _modify,
    delete: _delete,
    getTopZIndex: _getTopZIndex,
};

const TABLE_NAME = "notes";

async function _list() {
    const results = await database.table(TABLE_NAME).toArray();
    return results;
}

async function _getTopZIndex() {
    const result = await database.table(TABLE_NAME).orderBy("positionZ").last();
    return result?.positionZ || 0;
}

type createArgs = {
    theme?: string;
    content?: string;
    positionX?: number;
    positionY?: number;
    isPriority?: boolean;
    isMonospace?: boolean;
};

async function _create(args: createArgs) {
    const lastIndex = await _getTopZIndex();
    await database.table(TABLE_NAME).add({
        ...args,
        positionX: args.positionX || 10,
        positionY: args.positionY || 10,
        positionZ: lastIndex + 1,
    });
}

async function _modify(noteId: IndexableType, content: NoteModifyableFields) {
    await database.table(TABLE_NAME).update(noteId, content);
}

async function _delete(noteId: IndexableType) {
    await database.table(TABLE_NAME).where("id").equals(noteId).delete();
}
