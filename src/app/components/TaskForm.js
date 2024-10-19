"use client";

import { useState } from "react";

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
    if (!initialData) {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          required
        />
      </div>
      <div className="form-group">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
      <div className="button-group">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Task" : "Add Task"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
