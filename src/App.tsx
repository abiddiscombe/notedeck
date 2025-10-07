import { isMobile } from "react-device-detect";
import { Header } from "./blocks/Header/Header";
import { Main } from "./blocks/Main/Main";
import { Mobile } from "./blocks/Mobile/Mobile";
import "./css/main.css";

function App() {
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      <Main />
    </div>
  );
}

export default App;
