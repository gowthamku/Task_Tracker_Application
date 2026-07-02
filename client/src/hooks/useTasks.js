import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sort: 'newest',
    search: '',
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.priority !== 'all') params.priority = filters.priority;
      if (filters.sort !== 'newest') params.sort = filters.sort;
      if (filters.search) params.search = filters.search;

      const [tasksRes, statsRes] = await Promise.all([
        taskAPI.getAll(params),
        taskAPI.getStats(),
      ]);

      setTasks(tasksRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    const response = await taskAPI.create(taskData);
    await fetchTasks();
    return response.data.data;
  };

  const updateTask = async (id, taskData) => {
    const response = await taskAPI.update(id, taskData);
    await fetchTasks();
    return response.data.data;
  };

  const deleteTask = async (id) => {
    await taskAPI.delete(id);
    await fetchTasks();
  };

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    tasks,
    stats,
    loading,
    error,
    filters,
    createTask,
    updateTask,
    deleteTask,
    updateFilters,
    refreshTasks: fetchTasks,
  };
};
