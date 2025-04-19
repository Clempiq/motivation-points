import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, points: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onComplete, 
  onEdit, 
  onDelete, 
  onAdd 
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPoints, setNewTaskPoints] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newTaskTitle, parseInt(newTaskPoints) || 0);
    setNewTaskTitle('');
    setNewTaskPoints('');
    setIsAddingTask(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Tâches</h2>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center text-sm bg-violet-600 text-white px-3 py-1 rounded-md hover:bg-violet-700 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Ajouter une tâche
        </button>
      </div>

      {isAddingTask && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="newTaskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Tâche
              </label>
              <input
                type="text"
                id="newTaskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                placeholder="Quelle tâche souhaites-tu ajouter ?"
              />
            </div>
            <div>
              <label htmlFor="newTaskPoints" className="block text-sm font-medium text-gray-700 mb-1">
                Points
              </label>
              <input
                type="number"
                id="newTaskPoints"
                value={newTaskPoints}
                onChange={(e) => setNewTaskPoints(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                placeholder="Combien de points vaut cette tâche ?"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-violet-600 text-white rounded-md hover:bg-violet-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune tâche pour le moment. Commence par en ajouter une !</p>
        ) : (
          tasks.sort((a, b) => b.createdAt - a.createdAt).map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;