import { Link } from "lucide-react";
import React from "react";
import { isMobile } from "react-device-detect";

export const CheckViewportProvider = ({
  children,
}: React.ComponentProps<"div">) => {
  const showMobileScreen = isMobile;

  if (showMobileScreen) {
    return (
      <div className="bg-base-50 dark:bg-base-950 grid h-dvh grid-rows-[auto_1fr]">
        <header className="p-10">
          <span className="text-base-950 dark:text-base-100 text-sm font-semibold tracking-tight">
            NoteDeck
          </span>
        </header>
        <main className="m-auto max-w-sm p-10 pb-20">
          <h2>Sorry, mobile devices are not supported :/</h2>
          <p>To explore NoteDeck, open this page on your desktop or laptop.</p>
          <p>
            <Link
              href="https://github.com/abiddiscombe/notedeck"
              target="_blank"
            >
              Learn more about NoteDeck.
            </Link>
          </p>
        </main>
      </div>
    );
  }

  return children;
};
