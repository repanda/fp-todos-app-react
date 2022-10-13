import React, { Fragment, useState } from "react";
import TaskSearchBar from "../TaskSearchBar/TaskSearchBar.view";
import TaskList from "../TaskList/TaskList.view";
import { fetchData, saveToDB } from "../../helpers";

export type Task = {
  id: number;
  value: string;
  done: boolean;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(fetchData("tasks") || []);
  React.useEffect(() => {
    saveToDB("tasks", tasks);
  }, [tasks]);

  const addTask = (task: string) => {
    setTasks((prevState: Task[]) => {
      const newData: Task[] = [
        ...prevState,
        {
          id: new Date().getTime(),
          value: task,
          done: false,
        },
      ];

      return newData;
    });
  };

  return (
    <Fragment>
      <TaskSearchBar setTasks={setTasks} addTask={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Fragment>
  );
};

export default Tasks;
