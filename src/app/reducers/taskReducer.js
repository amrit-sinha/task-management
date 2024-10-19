import { sortTasks } from "../utils";

export const ACTIONS = {
  INITIALIZE: "INITIALIZE",
  ADD_TASK: "ADD_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
};

export const taskReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case ACTIONS.INITIALIZE:
      newState = action.payload;
      break;

    case ACTIONS.ADD_TASK:
      newState = sortTasks([
        ...state,
        {
          ...action.payload,
          id: Date.now().toString(),
          completed: false,
        },
      ]);
      break;

    case ACTIONS.UPDATE_TASK:
      newState = sortTasks(
        state.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      );
      break;

    case ACTIONS.DELETE_TASK:
      newState = state.filter((task) => task.id !== action.payload);
      break;

    default:
      return state;
  }

  return newState;
};
