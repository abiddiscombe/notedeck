import { db, TABLE_NOTES } from "./db";
import { IndexableType } from "dexie";

export const serviceNote = {
    list,
    create,
    modify,
    remove,
    removeAll,
    getTopZIndex,
};

async function list() {
    return await db.table(TABLE_NOTES).toArray();
}

async function getTopZIndex() {
    const result = await db.table(TABLE_NOTES).orderBy("posZ").last();
    return result?.posZ || 0;
}

type createArgs = {
    theme?: string;
    content?: string;
    posX?: number;
    posY?: number;
    posZ?: number;
    posH?: number;
    posW?: number;
    isPriority?: boolean;
    isMonospace?: boolean;
};

async function create(args: createArgs) {
    const lastIndex = await getTopZIndex();
    await db.table(TABLE_NOTES).add({
        ...args,
        posX: args.posX || 10,
        posY: args.posY || 10,
        posH: args.posH || 200,
        posW: args.posW || 400,
        posZ: args.posZ || lastIndex + 1,
    });
}

export type NoteModifyableFields = {
    posX?: number;
    posY?: number;
    posZ?: number;
    posH?: number;
    posW?: number;
    theme?: string;
    content?: string;
    isPriority?: boolean;
    isMonospace?: boolean;
};

async function modify(noteId: IndexableType, content: NoteModifyableFields) {
    await db.table(TABLE_NOTES).update(noteId, content);
}

async function remove(noteId: IndexableType) {
    await db.table(TABLE_NOTES).where("id").equals(noteId).delete();
}

async function removeAll(deletePriorityNotes: boolean) {
    const notes = await db.table(TABLE_NOTES).toArray();
    notes.forEach(async (note) => {
        if (!deletePriorityNotes && note.isPriority) return;
        await db.table(TABLE_NOTES).where("id").equals(note.id).delete();
    });
}
