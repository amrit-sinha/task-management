import { sortTasks } from "../utils";

export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return sortTasks([
        ...state,
        {
          ...action.payload,
          id: Date.now().toString(),
          completed: false,
        },
      ]);

    case ACTIONS.UPDATE_TASK:
      return sortTasks(
        state.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      );

    case ACTIONS.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
};
