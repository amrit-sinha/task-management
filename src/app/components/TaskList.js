"use client";

import { useReducer, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Modal from "./Modal";
import { taskReducer, ACTIONS } from "../reducers/taskReducer";

const TaskList = ({ initialTasks }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const handleAddTask = (newTask) => {
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: newTask,
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateTask = (id, updates) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { id, updates },
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: id,
    });
    setDeletingTask(null);
  };

  const handleToggleComplete = (id, completed) => {
    dispatch({
      type: ACTIONS.UPDATE_TASK,
      payload: { id, updates: { completed } },
    });
  };

  return (
    <div>
      <div className="add-task-button-container">
        <button
          className="btn btn-primary add-task-button"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Task
        </button>
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task"
      >
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            initialData={editingTask}
            onSubmit={(updatedTask) =>
              handleUpdateTask(editingTask.id, updatedTask)
            }
            onCancel={() => setEditingTask(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={deletingTask !== null}
        onClose={() => setDeletingTask(null)}
        title="Are you sure?"
      >
        {deletingTask && (
          <>
            <div>
              <button
                onClick={() => handleDeleteTask(deletingTask.id)}
                className="btn btn-delete"
              >
                Yes
              </button>
              <button
                onClick={() => setDeletingTask(null)}
                className="btn btn-edit"
              >
                No
              </button>
            </div>
          </>
        )}
      </Modal>

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => setEditingTask(task)}
            onUpdate={(id, updates) => handleUpdateTask(id, updates)}
            onDelete={() => setDeletingTask(task)}
            onToggleComplete={(completed) =>
              handleToggleComplete(task.id, completed)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
