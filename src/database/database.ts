import Dexie, { IndexableType, Table } from "dexie";

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

export type NoteItem = {
    id: IndexableType;
    posX: number;
    posY: number;
    posZ: number;
    posH: number;
    posW: number;
    theme: string;
    content: string;
    isPriority: boolean;
    isMonospace: boolean;
};

export class MySubClassedDexie extends Dexie {
    notes!: Table<NoteItem>;

    constructor() {
        super("notedeck-db");
        this.version(1).stores({
            notes: "++id, theme, content, positionX, positionY, positionZ, isPriority, isMonospace",
        });
        this.version(2)
            .stores({
                notes: "++id, posX, posY, posZ, posH, posW, theme, content, isPriority, isMonospace",
            })
            .upgrade((transaction) => {
                return transaction
                    .table("notes")
                    .toCollection()
                    .modify((note) => {
                        note.posX = note.positionX;
                        note.posY = note.positionY;
                        note.posZ = note.positionZ;
                        note.posH = 200;
                        note.posW = 400;
                        delete note.positionX;
                        delete note.positionY;
                        delete note.positionZ;
                    });
            });
    }
}

export const database = new MySubClassedDexie();
