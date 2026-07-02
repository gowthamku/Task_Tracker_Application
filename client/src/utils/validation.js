export const validateTask = (task) => {
  const errors = {};

  if (!task.title || !task.title.trim()) {
    errors.title = 'Task title is required';
  } else if (task.title.trim().length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  if (task.description && task.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  if (task.status && !['pending', 'in-progress', 'completed'].includes(task.status)) {
    errors.status = 'Invalid status';
  }

  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.priority = 'Invalid priority';
  }

  if (task.dueDate) {
    const date = new Date(task.dueDate);
    if (isNaN(date.getTime())) {
      errors.dueDate = 'Invalid date';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
};
