import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import Dashboard from './pages/Dashboard';
import Entities from './pages/Entities';
import Partnerships from './pages/Partnerships';
import Insights from './pages/Insights';
import Collaboration from './pages/Collaboration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="entities" element={<Entities />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="insights" element={<Insights />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
