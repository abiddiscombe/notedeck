import { IndexableType } from "dexie";

export type NoteItem = {
  id: IndexableType;
  posX: number;
  posY: number;
  posZ: number;
  posH: number;
  posW: number;
  theme: string;
  content: string;
  isMonospace: boolean;
};

export type ModifiableNoteItem = {
  posX?: number;
  posY?: number;
  posZ?: number;
  posH?: number;
  posW?: number;
  theme?: string;
  content?: string;
  isMonospace?: boolean;
};
