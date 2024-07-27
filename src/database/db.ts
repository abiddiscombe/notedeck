import Dexie, { IndexableType, Table } from "dexie";
import { TABLE_NAMES } from "../utilities/constants";

export interface NoteItem {
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
}

export interface SettingItem {
    id?: IndexableType;
    key: string;
    value: boolean;
}

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
                    .table(TABLE_NAMES.Notes)
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

        this.version(3).stores({
            notes: "++id, posX, posY, posZ, posH, posW, theme, content, isPriority, isMonospace",
            settings: "++id, &key, value",
        });
    }
}

export const db = new MySubClassedDexie();
