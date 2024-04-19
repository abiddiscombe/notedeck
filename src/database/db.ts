import Dexie, { IndexableType, Table } from "dexie";

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

export type SettingItem = {
    id?: IndexableType;
    content: {
        useOpaqueNotes?: boolean;
    };
};

export const TABLE_NOTES = "notes";
export const TABLE_SETTINGS = "settings";

export class MySubClassedDexie extends Dexie {
    notes!: Table<NoteItem>;
    settings!: Table<SettingItem>;

    constructor() {
        super("notedeck-db");

        this.version(1).stores({
            notes: "++id, theme, content, positionX, positionY, positionZ, isPriority, isMonospace",
        });

        this.version(2)
            .stores({
                notes: "++id, posX, posY, posZ, posH, posW, theme, content, isPriority, isMonospace",
                settings: "++id, content",
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

export const db = new MySubClassedDexie();
