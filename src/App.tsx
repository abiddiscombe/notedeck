import Main from "./blocks/Main/Main";
import Header from "./blocks/Header/Header";
import Mobile from "./blocks/Mobile/Mobile";
import { isMobile } from "react-device-detect";

function App() {
  if (isMobile) {
    return <Mobile />;
  }

  return (
    <div className="grid h-screen grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
      <Header />
      <Main />
    </div>
  );
}

export default App;
