// A series of constants and type definitions
// that are used globally across the app.

export enum APP_INFO {
    Name = "NoteDeck",
    SemVer = "1.6.0",
    InfoUrl = "https://www.notedeck.dev",
    SourceUrl = "https://github.com/abiddiscombe/notedeck",
    ReleasesUrl = "https://api.github.com/repos/abiddiscombe/notedeck/releases",
}

export enum TABLE_NAMES {
    Notes = "notes",
    Settings = "settings",
}

export enum SETTINGS_KEYS {
    UseOpaqueNotes = "useOpaqueNotes",
    AutoUpdateCheck = "autoUpdateCheck",
}
