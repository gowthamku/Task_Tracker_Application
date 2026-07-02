import { useState, useEffect, useCallback, createContext, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
};

function Toast({ notification, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onDismiss(notification.id), 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  return (
    <div
      className={`toast toast-${notification.type} ${isExiting ? 'toast-exit' : ''}`}
      style={{
        animation: isExiting ? 'slideToastOut 0.3s ease-in forwards' : 'slideToast 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <span className="toast-icon">{ICONS[notification.type]}</span>
      <span className="toast-message">{notification.message}</span>
      <button className="toast-close" onClick={() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(notification.id), 300);
      }}>
        ✕
      </button>
    </div>
  );
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = {
    success: (msg) => addNotification(msg, 'success'),
    error: (msg) => addNotification(msg, 'error'),
    info: (msg) => addNotification(msg, 'info'),
    warning: (msg) => addNotification(msg, 'warning'),
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <div className="toast-container">
        {notifications.map((n) => (
          <Toast key={n.id} notification={n} onDismiss={removeNotification} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
