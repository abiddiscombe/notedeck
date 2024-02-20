import { Header } from "./blocks/Header/Header";
import { Main } from "./blocks/Main/Main";

export default function App() {
    return (
        <div className="grid h-screen grid-rows-[auto,_1fr]">
            <Header />
            <Main />
        </div>
    );
}
