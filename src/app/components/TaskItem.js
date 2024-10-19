"use client";

const TaskItem = ({ task, onEdit, onUpdate, onDelete }) => {
  return (
    <div
      className={`task-item priority-${task.priority} ${
        task.completed ? "completed" : ""
      }`}
    >
      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onUpdate(task.id, { completed: !task.completed })}
          />
        </div>
        <div className="task-details">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span className="priority-badge">Priority: {task.priority}</span>
        </div>
        <div className="task-actions">
          <button onClick={onEdit} className="btn btn-edit">
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
