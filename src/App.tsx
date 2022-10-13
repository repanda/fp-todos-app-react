import React, { useState } from "react";
import Header from "./components/Header/Header.view";
import Footer from "./components/Footer/Footer.view";
import { fetchData, saveToDB } from "./helpers";

import "./App.scss";
import Tasks from "./components/Tasks/Tasks.view";

function App() {

  const [config, setConfig] = useState(fetchData<any>("config") || {
    darkModeFlag: false,
    hideCompletedTasksFlag: false
  }
  );

  React.useEffect(() => {
    saveToDB("config", config);
  }, [config]);


  const toogleDarkMode = () => setConfig({ ...config, darkModeFlag: !config.darkModeFlag });
  const toogleCompletedTasks = () => setConfig({ ...config, hideCompletedTasksFlag: !config.hideCompletedTasksFlag });

  const getAppClasses = `App ${config.darkModeFlag ? "App--isDark" : ""}`;

  return (
    <main className={getAppClasses}>
      <Header darkModeFlag={config.darkModeFlag} toogleDarkMode={toogleDarkMode} />
      <div className="App__wrapper">
        <Tasks toogleCompletedTasks={toogleCompletedTasks}/>
        <Footer />
      </div>
    </main>
  );
}

export default App;

/*Todo
 * Create the project
 * Structure the app and create the components
 * show/hide completed tasks
 * add light/dark theme
 * PWA
 * update readme file
 * update video's link in the footer
 */
