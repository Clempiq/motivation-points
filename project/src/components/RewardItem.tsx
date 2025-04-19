import React, { useState } from 'react';
import { Gift, Edit, Trash2 } from 'lucide-react';
import { Reward } from '../types';

interface RewardItemProps {
  reward: Reward;
  currentPoints: number;
  onRedeem: (id: string) => void;
  onEdit: (reward: Reward) => void;
  onDelete: (id: string) => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ 
  reward, 
  currentPoints,
  onRedeem, 
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(reward.title);
  const [cost, setCost] = useState(reward.cost.toString());

  const canRedeem = currentPoints >= reward.cost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({
      ...reward,
      title,
      cost: parseInt(cost) || 0
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-3 transition transform hover:scale-[1.01] hover:shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Reward
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost (points)
            </label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700"
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
          <h3 className="font-medium">{reward.title}</h3>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            {reward.cost} pts
          </span>
          <button 
            onClick={() => onRedeem(reward.id)}
            disabled={!canRedeem}
            className={`p-1 ${canRedeem ? 'text-teal-600 hover:text-teal-800' : 'text-gray-400 cursor-not-allowed'} transition-colors`}
            aria-label="Redeem reward"
            title={canRedeem ? "Redeem reward" : "Not enough points"}
          >
            <Gift size={20} />
          </button>
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Edit reward"
          >
            <Edit size={20} />
          </button>
          <button 
            onClick={() => onDelete(reward.id)}
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            aria-label="Delete reward"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardItem;