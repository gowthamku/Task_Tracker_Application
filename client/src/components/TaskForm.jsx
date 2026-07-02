import { useState, useEffect } from 'react';
import { validateTask } from '../utils/validation';

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateTask(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.dueDate) {
        dataToSubmit.dueDate = null;
      }
      await onSubmit(dataToSubmit);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title <span className="required">*</span></label>
        <input
          id="title"
          type="text"
          name="title"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          autoFocus
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
        <span className="char-count">{formData.title.length}/100</span>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className={`form-input form-textarea ${errors.description ? 'input-error' : ''}`}
          placeholder="Add details about this task..."
          value={formData.description}
          onChange={handleChange}
          maxLength={500}
          rows={3}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
        <span className="char-count">{formData.description.length}/500</span>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>
      </div>

      {errors.submit && (
        <div className="form-error-banner">{errors.submit}</div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="spinner" style={{ width: 16, height: 16 }} /> Saving...</>
          ) : (
            task ? '💾 Update Task' : '➕ Create Task'
          )}
        </button>
      </div>
    </form>
  );
}
