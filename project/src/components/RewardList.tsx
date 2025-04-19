import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import RewardItem from './RewardItem';
import { Reward } from '../types';

interface RewardListProps {
  rewards: Reward[];
  currentPoints: number;
  onRedeem: (id: string) => void;
  onEdit: (reward: Reward) => void;
  onDelete: (id: string) => void;
  onAdd: (title: string, cost: number) => void;
}

const RewardList: React.FC<RewardListProps> = ({ 
  rewards, 
  currentPoints,
  onRedeem, 
  onEdit, 
  onDelete, 
  onAdd 
}) => {
  const [isAddingReward, setIsAddingReward] = useState(false);
  const [newRewardTitle, setNewRewardTitle] = useState('');
  const [newRewardCost, setNewRewardCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newRewardTitle, parseInt(newRewardCost) || 0);
    setNewRewardTitle('');
    setNewRewardCost('');
    setIsAddingReward(false);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Récompenses</h2>
        <button
          onClick={() => setIsAddingReward(true)}
          className="flex items-center text-sm bg-teal-600 text-white px-3 py-1 rounded-md hover:bg-teal-700 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          Ajouter une récompense
        </button>
      </div>

      {isAddingReward && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="newRewardTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Récompense
              </label>
              <input
                type="text"
                id="newRewardTitle"
                value={newRewardTitle}
                onChange={(e) => setNewRewardTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                placeholder="Quelle récompense souhaites-tu ajouter ?"
              />
            </div>
            <div>
              <label htmlFor="newRewardCost" className="block text-sm font-medium text-gray-700 mb-1">
                Coût (points)
              </label>
              <input
                type="number"
                id="newRewardCost"
                value={newRewardCost}
                onChange={(e) => setNewRewardCost(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                placeholder="Combien de points coûte cette récompense ?"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingReward(false)}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-2">
        {rewards.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune récompense pour le moment. Ajoutes-en pour te motiver !</p>
        ) : (
          rewards.sort((a, b) => a.cost - b.cost).map(reward => (
            <RewardItem
              key={reward.id}
              reward={reward}
              currentPoints={currentPoints}
              onRedeem={onRedeem}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RewardList;