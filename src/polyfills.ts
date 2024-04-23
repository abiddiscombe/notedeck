// Required to ensure TS accepts a function
// written in the `head` of `index.html`.

declare interface Window {
    toggleTheme: () => void;
}
