import { Link } from "@/components/elements/link";
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
          <h1 className="text-base-950 dark:text-base-100 text-lg font-semibold tracking-tight">
            NoteDeck
          </h1>
        </header>
        <main className="m-auto max-w-sm p-10 pb-20">
          <h2 className="mb-6 text-xl">
            Sorry, mobile devices are not supported <span aria-hidden>:/</span>
          </h2>
          <p className="mb-8">
            To explore NoteDeck, open this page on your desktop or laptop.{" "}
            <Link
              href="https://github.com/abiddiscombe/notedeck"
              target="_blank"
            >
              Learn more.
            </Link>
          </p>
        </main>
      </div>
    );
  }

  return children;
};
