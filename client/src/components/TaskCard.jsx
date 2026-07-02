import { useState } from 'react';
import { formatDate, isOverdue, getRelativeTime } from '../utils/validation';

const STATUS_CONFIG = {
  pending: { label: 'Pending', icon: '⏳', className: 'status-pending' },
  'in-progress': { label: 'In Progress', icon: '🔄', className: 'status-progress' },
  completed: { label: 'Completed', icon: '✅', className: 'status-completed' },
};

const PRIORITY_CONFIG = {
  low: { label: 'Low', icon: '🟢', className: 'priority-low' },
  medium: { label: 'Medium', icon: '🟡', className: 'priority-medium' },
  high: { label: 'High', icon: '🔴', className: 'priority-high' },
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const status = STATUS_CONFIG[task.status];
  const priority = PRIORITY_CONFIG[task.priority];
  const overdue = isOverdue(task.dueDate) && task.status !== 'completed';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch {
        setIsDeleting(false);
      }
    }
  };

  const cycleStatus = () => {
    const statusOrder = ['pending', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task._id, { ...task, status: nextStatus });
  };

  return (
    <div
      className={`task-card ${isDeleting ? 'task-card-deleting' : ''} ${overdue ? 'task-card-overdue' : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="task-card-header">
        <div className="task-badges">
          <button
            className={`badge ${status.className}`}
            onClick={cycleStatus}
            title="Click to change status"
          >
            {status.icon} {status.label}
          </button>
          <span className={`badge ${priority.className}`}>
            {priority.icon} {priority.label}
          </span>
        </div>
        <div className="task-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            title="Delete task"
            disabled={isDeleting}
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
        {task.title}
      </h3>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className={`task-due ${overdue ? 'overdue' : ''}`}>
            📅 {overdue ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}
          </span>
        )}
        <span className="task-created" title={new Date(task.createdAt).toLocaleString()}>
          {getRelativeTime(task.createdAt)}
        </span>
      </div>
    </div>
  );
}
