import React, { useState } from 'react';
import RewardList from '../components/RewardList';
import Toast from '../components/Toast';
import { useMotivationStore } from '../hooks/useMotivationStore';
import { Reward } from '../types';

interface ToastInfo {
  message: string;
  type: 'success' | 'error';
}

const RewardsPage: React.FC = () => {
  const { 
    rewards,
    points,
    addReward,
    editReward,
    deleteReward,
    redeemReward
  } = useMotivationStore();

  const [toast, setToast] = useState<ToastInfo | null>(null);

  const handleRedeemReward = (id: string) => {
    const reward = rewards.find(r => r.id === id);
    if (reward && points >= reward.cost) {
      redeemReward(id);
      setToast({
        message: `🎉 Bravo, tu as mérité "${reward.title}" ! Profite-en !`,
        type: 'success'
      });
    } else {
      setToast({
        message: 'Pas assez de points pour cette récompense',
        type: 'error'
      });
    }
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div>
      <RewardList
        rewards={rewards}
        currentPoints={points}
        onRedeem={handleRedeemReward}
        onEdit={editReward}
        onDelete={deleteReward}
        onAdd={addReward}
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

export default RewardsPage;