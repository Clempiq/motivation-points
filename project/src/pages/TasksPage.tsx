import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import Toast from '../components/Toast';
import { useMotivationStore } from '../hooks/useMotivationStore';
import { Task } from '../types';

interface ToastInfo {
  message: string;
  type: 'success' | 'error';
}

const TasksPage: React.FC = () => {
  const { 
    tasks,
    addTask,
    editTask,
    deleteTask,
    completeTask
  } = useMotivationStore();

  const [toast, setToast] = useState<ToastInfo | null>(null);

  const handleCompleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    completeTask(id);
    setToast({
      message: `🎯 +${task?.points} points ! Continue comme ça !`,
      type: 'success'
    });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div>
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onEdit={editTask}
        onDelete={deleteTask}
        onAdd={addTask}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default TasksPage;