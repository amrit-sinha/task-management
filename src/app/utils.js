export const sortTasks = (tasks) => {
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (!a.completed && !b.completed) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });
};
