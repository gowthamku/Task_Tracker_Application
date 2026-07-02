import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3 className="empty-title">No tasks found</h3>
        <p className="empty-description">
          Create your first task to get started, or try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task, index) => (
        <TaskCard
          key={task._id}
          task={task}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
