export const saveToDB = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const fetchTasks = () => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) : [];
}

export const fetchConfig = () => {
  const data = localStorage.getItem("config");
  return data ? JSON.parse(data) : {
    darkModeFlag: false,
    hideCompletedTasksFlag: false
  };
}