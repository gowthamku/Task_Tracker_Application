import { NotificationProvider } from './components/Notification';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <Dashboard />
    </NotificationProvider>
  );
}

export default App;
