import React, { useState } from "react";
import checkmarkIcon from "../../assets/icon-checkmark.svg";
import basketIcon from "../../assets/icon-basket.svg";
import EmptyList from "../EmptyList/EmptyList.view";
import { fetchData, saveToDB } from "../../helpers";
import type { Task } from "../Tasks/Tasks.view";
import "./TaskList.style.scss";

type Props = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  updateTask: (value: string, taskID: number) => void;
};
const TaskList = ({ tasks, setTasks, updateTask }: Props) => {
  const [editModeID, setEditModeID] = useState<null | number>(null);

  const [hideCompletedTasksFlag, setHideCompletedTasksFlag] = useState<boolean>(
    fetchData("hideCompletedTasksFlag") || false
  );

  const onRemoveTask = (taskID: number, shouldConfirm: boolean = true) => {
    if (shouldConfirm) {
      const result = window.confirm(
        "سيتم حذف هذه المهمه نهائيا, هل أنت متأكد؟"
      );

      if (!result) {
        return false;
      }
    }

    setTasks(
      tasks.filter((task) => {
        return task.id !== taskID;
      })
    );
  };

  const onKeyDown = (taskValue: string, taskID: number) => {
    setEditModeID(null);

    if (!taskValue.trim()) {
      onRemoveTask(taskID, hideCompletedTasksFlag);
    }
  };

  const onCheckTask = (taskID: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskID ? { ...task, done: !task.done } : task
      )
    );
  };

  const toggleCompletedTasksFlag = () => {
    const result = !hideCompletedTasksFlag;

    setHideCompletedTasksFlag(result);
    saveToDB("hideCompletedTasksFlag", result);
  };

  const generateTaskClasses = (done: boolean) =>
    `TaskList__taskContent ${done ? "TaskList__taskContent--isActive" : ""}`;

  const generateLinkClasses = `TaskList__link ${
    hideCompletedTasksFlag ? "TaskList__link--isActive" : ""
  }`;

  const exitEditMode = (taskID: number, taskValue: string) => {
    setEditModeID(null);

    if (!taskValue.trim()) {
      onRemoveTask(taskID, false);
    }
  };

  return (
    <div className="TaskList">
      {!!tasks.length && (
        <p className={generateLinkClasses} onClick={toggleCompletedTasksFlag}>
          {hideCompletedTasksFlag ? (
            <span>إظهار المهام المكتملة</span>
          ) : (
            <span>إخفاء المهام المكتملة</span>
          )}
        </p>
      )}
      <ul className="TaskList__list">
        {tasks.length ? (
          tasks
            .filter((task) => !hideCompletedTasksFlag || !task.done)
            .reverse()
            .map((task) => (
              <li className={generateTaskClasses(task.done)} key={task.id}>
                {task.done}
                <div
                  className="TaskList__checkbox"
                  onClick={() => onCheckTask(task.id)}
                >
                  <img
                    className="TaskList__checkboxImg"
                    src={checkmarkIcon}
                    alt="checkmark"
                  />
                </div>
                <div className="TaskList__valueContent">
                  {editModeID != null ? (
                    <input
                      className="TaskList__valueInput"
                      type="text"
                      value={task.value}
                      onChange={(event) =>
                        updateTask(event.target.value, task.id)
                      }
                      autoFocus={true}
                      onBlur={() => exitEditMode(task.id, task.value)}
                      onKeyDown={(event) =>
                        event.key === "Enter" &&
                        onKeyDown(event.currentTarget.value, task.id)
                      }
                    />
                  ) : (
                    <p
                      className="TaskList__value"
                      onClick={() => setEditModeID(task.id)}
                    >
                      {task.value}
                    </p>
                  )}
                  {editModeID == null && (
                    <img
                      src={basketIcon}
                      className="TaskList__deleteIcon"
                      alt="basket-icon"
                      onClick={() => onRemoveTask(task.id, true)}
                    />
                  )}
                </div>
              </li>
            ))
        ) : (
          <EmptyList />
        )}
      </ul>
    </div>
  );
};

export default TaskList;
