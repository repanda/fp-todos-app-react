import React, { useState } from "react";
import Header from "./components/Header/Header.view";
import Footer from "./components/Footer/Footer.view";
import { fetchConfig, saveToDB } from "./helpers";

import "./App.scss";
import Tasks from "./components/Tasks/Tasks.view";
import { flow } from "fp-ts/lib/function";
import * as I from "io-ts";
import * as E from "fp-ts/Either";

const Config = I.type({
  darkModeFlag: I.boolean,
  hideCompletedTasksFlag: I.boolean
})

export type Config = I.TypeOf<typeof Config>;

function App() {

  const [config, setConfig] = useState<Config>({
    darkModeFlag: false,
    hideCompletedTasksFlag: false
  }
  );

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loading || saveToDB("config", config);
  }, [loading, config]);

  React.useEffect(flow(
    fetchConfig,
    Config.decode,
    E.fold(
      errors => {
        console.log(errors);
      },
      config => {
        setConfig(config);
        setLoading(false);
      }
    )
  ), []);

  const toogleDarkMode = () => setConfig({ ...config, darkModeFlag: !config.darkModeFlag });
  const toogleCompletedTasks = () => setConfig({ ...config, hideCompletedTasksFlag: !config.hideCompletedTasksFlag });

  const getAppClasses = `App ${config.darkModeFlag ? "App--isDark" : ""}`;

  return (
    <main className={getAppClasses}>
      <Header darkModeFlag={config.darkModeFlag} toogleDarkMode={toogleDarkMode} />
      <div className="App__wrapper">
        <Tasks
          toogleCompletedTasks={toogleCompletedTasks}
          hideCompletedTasksFlag={config.hideCompletedTasksFlag} />
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
