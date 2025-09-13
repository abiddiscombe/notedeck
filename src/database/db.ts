import Dexie, { IndexableType, Table } from "dexie";

enum TABLE_NAMES {
  Notes = "notes",
  Settings = "settings",
}

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
      notes:
        "++id, theme, content, positionX, positionY, positionZ, isPriority, isMonospace",
    });

    this.version(2)
      .stores({
        notes:
          "++id, posX, posY, posZ, posH, posW, theme, content, isPriority, isMonospace",
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
      notes:
        "++id, posX, posY, posZ, posH, posW, theme, content, isPriority, isMonospace",
      settings: "++id, &key, value",
    });

    this.version(4)
      .stores({
        notes:
          "++id, posX, posY, posZ, posH, posW, theme, content, isMonospace",
        settings: "++id, &key, value",
      })
      .upgrade((transaction) => {
        return transaction
          .table(TABLE_NAMES.Notes)
          .toCollection()
          .modify((note) => {
            delete note.isPriority;
          });
      });
  }
}

const db = new MySubClassedDexie();

export default db;
export { TABLE_NAMES };
