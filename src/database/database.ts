import Dexie, { IndexableType, Table } from "dexie";

export type NoteModifyableFields = {
    theme?: string;
    content?: string;
    isPriority?: boolean;
    isMonospace?: boolean;
    positionX?: number;
    positionY?: number;
    positionZ?: number;
};

export type NoteItem = {
    id: IndexableType;
    theme: string;
    content: string;
    positionX: number;
    positionY: number;
    positionZ: number;
    isPriority: boolean;
    isMonospace: boolean;
};

export class MySubClassedDexie extends Dexie {
    notes!: Table<NoteItem>;

    constructor() {
        super("notedeck-db");
        this.version(1).stores({
            // Primary key and indexed props
            notes: "++id, theme, content, positionX, positionY, positionZ, isPriority, isMonospace",
        });
    }
}

export const database = new MySubClassedDexie();
