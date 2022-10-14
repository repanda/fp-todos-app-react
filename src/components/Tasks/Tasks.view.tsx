import React, { Fragment, useState } from "react";
import TaskSearchBar from "../TaskSearchBar/TaskSearchBar.view";
import TaskList from "../TaskList/TaskList.view";
import { fetchTesks, saveToDB } from "../../helpers";
import { pipe } from "fp-ts/lib/function";
import * as I from "io-ts";
import * as E from "fp-ts/Either";


const Task = I.type({
  id: I.number,
  value: I.string,
  done: I.boolean,
})

export type Task = I.TypeOf<typeof Task>

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
      fetchTesks(),
      I.array(Task).decode,
      E.fold(
        errors => {
          console.log(errors);
          setTasks([]);
        },
        tasks => {
          setTasks(tasks);
          setLoading(false);
        }
      )

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
