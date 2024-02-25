import { Header } from "./blocks/Header/Header";
import { Main } from "./blocks/Main/Main";
import { Mobile } from "./blocks/Mobile/Mobile";

export default function App() {
    const isMobile = window.innerWidth < 600;

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
