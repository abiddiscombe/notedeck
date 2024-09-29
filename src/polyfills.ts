// Required to ensure TS accepts a function
// written in the `head` of `index.html`.

declare global {
  interface Window {
    toggleTheme: () => void;
  }
}

export {};
