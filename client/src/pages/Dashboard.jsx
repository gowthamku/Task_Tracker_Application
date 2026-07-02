import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useNotification } from '../components/Notification';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import { LoadingGrid } from '../components/Loader';

export default function Dashboard() {
  const { tasks, stats, loading, error, filters, createTask, updateTask, deleteTask, updateFilters } = useTasks();
  const notify = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = async (data) => {
    try {
      await createTask(data);
      setIsModalOpen(false);
      notify.success('Task created successfully!');
    } catch (err) {
      notify.error(err.message);
      throw err;
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await updateTask(editingTask._id, data);
      setEditingTask(null);
      setIsModalOpen(false);
      notify.success('Task updated successfully!');
    } catch (err) {
      notify.error(err.message);
      throw err;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      notify.success('Task deleted successfully!');
    } catch (err) {
      notify.error(err.message);
    }
  };

  const handleStatusChange = async (id, data) => {
    try {
      await updateTask(id, data);
      notify.info(`Task status changed to ${data.status}`);
    } catch (err) {
      notify.error(err.message);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="app-title">
              <span className="app-logo">⚡</span>
              <span className="gradient-text">TaskFlow</span>
            </h1>
            <p className="app-subtitle">Organize, track, and conquer your tasks</p>
          </div>
          <button className="btn btn-primary btn-glow" onClick={openCreateModal}>
            <span>+</span> New Task
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="dashboard-section">
        <StatsCards stats={stats} />
      </section>

      {/* Toolbar */}
      <section className="dashboard-section">
        <div className="toolbar">
          <SearchBar
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
          />
          <FilterBar
            filters={filters}
            onFilterChange={updateFilters}
          />
        </div>
      </section>

      {/* Task List */}
      <section className="dashboard-section">
        {error && (
          <div className="error-banner">
            <span>⚠️</span> {error}
          </div>
        )}
        {loading ? (
          <LoadingGrid />
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </section>

      {/* FAB for mobile */}
      <button className="fab" onClick={openCreateModal} title="Create new task">
        +
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? '✏️ Edit Task' : '➕ Create New Task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
