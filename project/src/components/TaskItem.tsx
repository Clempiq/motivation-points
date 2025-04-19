import React, { useState } from 'react';
import { CheckCircle, Edit, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onComplete, 
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [points, setPoints] = useState(task.points.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...task,
      title,
      points: parseInt(points) || 0
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-3 transition transform hover:scale-[1.01] hover:shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
              Points
            </label>
            <input
              type="number"
              id="points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-violet-600 text-white rounded-md hover:bg-violet-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3 transition transform hover:scale-[1.01] hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{task.title}</h3>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
            {task.points} pts
          </span>
          <button 
            onClick={() => onComplete(task.id)}
            className="p-1 text-green-600 hover:text-green-800 transition-colors"
            aria-label="Complete task"
          >
            <CheckCircle size={20} />
          </button>
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Edit task"
          >
            <Edit size={20} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;