import { IndexableType } from "dexie";
import { NoteModifyableFields, database } from "./database";

export const noteService = {
    list: _list,
    create: _create,
    modify: _modify,
    delete: _delete,
    deleteAll: _deleteAll,
    getTopZIndex: _getTopZIndex,
};

const TABLE_NAME = "notes";

async function _list() {
    const results = await database.table(TABLE_NAME).toArray();
    return results;
}

async function _getTopZIndex() {
    const result = await database.table(TABLE_NAME).orderBy("posZ").last();
    return result?.posZ || 0;
}

type createArgs = {
    theme?: string;
    content?: string;
    posX?: number;
    posY?: number;
    posH?: number;
    posW?: number;
    isPriority?: boolean;
    isMonospace?: boolean;
};

async function _create(args: createArgs) {
    const lastIndex = await _getTopZIndex();
    await database.table(TABLE_NAME).add({
        ...args,
        posX: args.posX || 10,
        posY: args.posY || 10,
        posH: args.posH || 200,
        posW: args.posW || 400,
        posZ: lastIndex + 1,
    });
}

async function _modify(noteId: IndexableType, content: NoteModifyableFields) {
    await database.table(TABLE_NAME).update(noteId, content);
}

async function _delete(noteId: IndexableType) {
    await database.table(TABLE_NAME).where("id").equals(noteId).delete();
}

async function _deleteAll(deletePriorityNotes: boolean) {
    const notes = await database.table(TABLE_NAME).toArray();
    notes.forEach(async (note) => {
        if (!deletePriorityNotes && note.isPriority) return;
        await database.table(TABLE_NAME).where("id").equals(note.id).delete();
    });
}
