import { useContext } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/16/solid";
import { AppContext } from "../../AppRoot";
import { Button } from "../../components/Button";

export function HeaderUpdateNotification() {
    const appContext = useContext(AppContext);

    function handleHardReload() {
        const refreshParam = new URLSearchParams(window.location.search);
        refreshParam.set("rts", new Date().getTime().toString());
        window.location.search = refreshParam.toString();
    }

    if (!appContext?.updateAvailable) {
        return null;
    }

    return (
        <Button
            size="sm"
            variant="ghost"
            className="bg-primary-50 dark:bg-primary-800"
            onClick={() => handleHardReload()}
        >
            <ArrowUpCircleIcon className="text-green-600" />
            <span>Upgrade to {appContext.updateTargetVersion}</span>
        </Button>
    );
}
