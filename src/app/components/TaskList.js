"use client";
import React, { useReducer, useState, useMemo, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import Modal from "./Modal";
import { taskReducer, ACTIONS } from "../reducers/taskReducer";

const TaskList = ({ initialTasks }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [isClient, setIsClient] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Initialize application state by retrieving stored tasks from local storage.
   * Runs only once when the component mounts.
   */
  useEffect(() => {
    setIsClient(true);
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "INITIALIZE", payload: JSON.parse(storedTasks) });
    }
  }, []);

  /**
   * Synchronizes tasks state with local storage.
   * Updates local storage whenever tasks or isClient changes.
   */
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

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

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <div>
      <div className="task-list-header">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="add-task-button">
          <button
            className="btn btn-primary add-task-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add Task
          </button>
        </div>
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
          <div className="task-actions">
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
        )}
      </Modal>

      <div className="task-list">
        {!!filteredTasks.length ? (
          filteredTasks.map((task) => (
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
          ))
        ) : (
          <h2>No Task Found...</h2>
        )}
      </div>
    </div>
  );
};

export default TaskList;
