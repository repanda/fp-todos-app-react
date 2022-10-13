import React, { Fragment, useState } from "react";
import TaskSearchBar from "../TaskSearchBar/TaskSearchBar.view";
import TaskList from "../TaskList/TaskList.view";
import { fetchData, saveToDB } from "../../helpers";
import { pipe } from "fp-ts/lib/function";

export type Task = {
  id: number;
  value: string;
  done: boolean;
};

type Props = {
  toogleCompletedTasks: () => void;
  hideCompletedTasksFlag: boolean;
}

const Tasks = ({ toogleCompletedTasks, hideCompletedTasksFlag }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    loading || saveToDB("tasks", tasks);
  }, [loading, tasks]);

  React.useEffect(() => {
    pipe(
      fetchData<Task[]>("tasks"),
      setTasks,
      () => setLoading(false)
    )
  }, []);

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
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTask={toggleTask}
        toogleCompletedTasks={toogleCompletedTasks}
        hideCompletedTasksFlag={hideCompletedTasksFlag}
      />
    </Fragment>
  );
};

export default Tasks;
