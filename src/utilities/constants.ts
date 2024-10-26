// A series of constants and type definitions
// that are used globally across the app.

export enum APP_INFO {
  Name = "NoteDeck",
  SemVer = "1.9.0",
  AppHost = "notedeck.dev",
  AppHostOld = "app.notedeck.dev", // Deprecating Dec 2024.
  GitHubRepoUrl = "https://github.com/abiddiscombe/notedeck",
}

export enum TABLE_NAMES {
  Notes = "notes",
  Settings = "settings",
}

export enum SETTINGS_KEYS {
  UseOpaqueNotes = "useOpaqueNotes",
  HideNonPriorityNotes = "hideNonPriorityNotes",
}
