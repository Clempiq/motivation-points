import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import RewardsPage from './pages/RewardsPage';
import { useMotivationStore } from './hooks/useMotivationStore';

function App() {
  const { points } = useMotivationStore();

  return (
    <BrowserRouter>
      <Layout points={points}>
        <Routes>
          <Route path="/taches" element={<TasksPage />} />
          <Route path="/recompenses" element={<RewardsPage />} />
          <Route path="/" element={<Navigate to="/taches" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;