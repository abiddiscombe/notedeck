import { isMobile } from "react-device-detect";
import { Mobile } from "./blocks/Mobile/Mobile";
import { Header } from "./blocks/Header/Header";
import { Main } from "./blocks/Main/Main";

export function App() {
    // We must hide the application UI
    // for mobile device users.

    if (isMobile) {
        return <Mobile />;
    }

    return (
        <div className="grid h-screen grid-rows-[auto,_1fr]">
            <Header />
            <Main />
        </div>
    );
}
