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

  const addTask = (task: string) => setTasks((prevState: Task[]) => [
    ...prevState,
    {
      id: new Date().getTime(),
      value: task,
      done: false,
    },
  ])

  const updateTask = (value: string, taskID: number) => setTasks(
    tasks.map((task) =>
      task.id === taskID ? { ...task, value: value } : task
    )
  );


  const removeTask = (taskID: number) => setTasks(
    tasks.filter((task) => {
      return task.id !== taskID;
    })
  );

  const toggleTask = (taskID: number) => setTasks(
    tasks.map((task) =>
      task.id === taskID ? { ...task, done: !task.done } : task
    )
  );

  return (
    <Fragment>
      <TaskSearchBar addTask={addTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTask={toggleTask}
      />
    </Fragment>
  );
};

export default Tasks;
