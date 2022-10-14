import React, { useState } from "react";
import * as E from 'fp-ts/Either'
import { flow } from "fp-ts/lib/function";
import * as I from 'io-ts';

import Header from "./components/Header/Header.view";
import Footer from "./components/Footer/Footer.view";
import { fetchConfig, saveToDB } from "./helpers";

import "./App.scss";
import Tasks from "./components/Tasks/Tasks.view";

const Config = I.type({
  darkModeFlag: I.boolean,
  hideCompletedTasksFlag: I.boolean
});

export type Config = I.TypeOf<typeof Config>;


function App() {

  const [config, setConfig] = useState<Config>({
    darkModeFlag: false,
    hideCompletedTasksFlag: false
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loading || saveToDB("config", config);
  }, [loading, config]);

  React.useEffect(flow(
    fetchConfig,
    Config.decode,
    E.fold(
      errors => {
        console.error(errors);
      },
      config => {
        setConfig(config);
        setLoading(false)
      }
    )
  ), []);

  const toggleDarkMode = () => setConfig({ ...config, darkModeFlag: !config.darkModeFlag })
  const toggleCompletedTasks = () => setConfig({ ...config, hideCompletedTasksFlag: !config.hideCompletedTasksFlag })

  const getAppClasses = `App ${config.darkModeFlag ? "App--isDark" : ""}`;

  return (
    <main className={getAppClasses}>
      <Header darkModeFlag={config.darkModeFlag} toggleDarkMode={toggleDarkMode} />
      <div className="App__wrapper">
        <Tasks
          hideCompletedTasksFlag={config.hideCompletedTasksFlag}
          toggleCompletedTasks={toggleCompletedTasks} />
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
