import { useReducer, useEffect } from 'react';
import { AppState, ActionType, Task, Reward } from '../types';

const defaultTasks: Task[] = [
  { id: '1', title: 'Faire une machine à laver complète', points: 15, createdAt: Date.now() },
  { id: '2', title: 'Ranger une pièce entière', points: 10, createdAt: Date.now() },
  { id: '3', title: 'Faire 30 minutes de sport', points: 20, createdAt: Date.now() },
  { id: '4', title: 'Préparer un repas maison équilibré', points: 15, createdAt: Date.now() },
  { id: '5', title: 'Passer l\'aspirateur', points: 10, createdAt: Date.now() },
  { id: '6', title: 'Sortir les poubelles', points: 5, createdAt: Date.now() },
  { id: '7', title: 'Faire les courses alimentaires', points: 10, createdAt: Date.now() },
  { id: '8', title: '1h de travail sans distractions', points: 15, createdAt: Date.now() },
  { id: '9', title: 'Lire 10 pages d\'un livre', points: 10, createdAt: Date.now() },
  { id: '10', title: 'Méditer 10 minutes', points: 10, createdAt: Date.now() },
  { id: '11', title: 'Se coucher avant 23h', points: 15, createdAt: Date.now() },
  { id: '12', title: 'Ne pas toucher au téléphone pendant 2h', points: 15, createdAt: Date.now() },
  { id: '13', title: 'Faire du tri dans ses mails/papiers', points: 10, createdAt: Date.now() },
  { id: '14', title: 'Aider quelqu\'un sans contrepartie', points: 20, createdAt: Date.now() },
  { id: '15', title: 'Nettoyer la salle de bain', points: 15, createdAt: Date.now() }
];

const defaultRewards: Reward[] = [
  { id: '1', title: '1 bière ou boisson plaisir', cost: 10, createdAt: Date.now() },
  { id: '2', title: '2h de console ou Netflix', cost: 20, createdAt: Date.now() },
  { id: '3', title: 'Commander une pizza ou repas livré', cost: 30, createdAt: Date.now() },
  { id: '4', title: 'Grasse matinée (sans alarme)', cost: 25, createdAt: Date.now() },
  { id: '5', title: 'Après-midi libre sans obligations', cost: 40, createdAt: Date.now() },
  { id: '6', title: 'Pause sucrée gourmande', cost: 10, createdAt: Date.now() },
  { id: '7', title: 'Acheter un petit cadeau (jeu, livre, vêtement)', cost: 50, createdAt: Date.now() },
  { id: '8', title: 'Soirée entre amis', cost: 30, createdAt: Date.now() },
  { id: '9', title: 'Prendre un bain relaxant', cost: 20, createdAt: Date.now() },
  { id: '10', title: 'Session gaming "illimitée" jusqu\'à épuisement', cost: 35, createdAt: Date.now() },
  { id: '11', title: 'Shopping loisir (magasins ou en ligne)', cost: 40, createdAt: Date.now() },
  { id: '12', title: 'Journée chill total (aucune tâche imposée)', cost: 50, createdAt: Date.now() },
  { id: '13', title: 'Petit road trip ou sortie spéciale', cost: 60, createdAt: Date.now() },
  { id: '14', title: 'Écouter un album entier tranquille', cost: 10, createdAt: Date.now() },
  { id: '15', title: '1h de sieste bonus', cost: 15, createdAt: Date.now() }
];

// Initial state
const initialState: AppState = {
  tasks: defaultTasks,
  rewards: defaultRewards,
  points: 0
};

// Load state from localStorage
const loadState = (): AppState => {
  try {
    const savedState = localStorage.getItem('motivationPointsState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return initialState;
};

// Save state to localStorage
const saveState = (state: AppState): void => {
  try {
    localStorage.setItem('motivationPointsState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Reducer function
const reducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.task.id ? action.task : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      };
    case 'COMPLETE_TASK': {
      const task = state.tasks.find(t => t.id === action.id);
      if (!task) return state;
      
      return {
        ...state,
        points: state.points + task.points
      };
    }
    case 'ADD_REWARD':
      return {
        ...state,
        rewards: [...state.rewards, action.reward]
      };
    case 'EDIT_REWARD':
      return {
        ...state,
        rewards: state.rewards.map(reward => 
          reward.id === action.reward.id ? action.reward : reward
        )
      };
    case 'DELETE_REWARD':
      return {
        ...state,
        rewards: state.rewards.filter(reward => reward.id !== action.id)
      };
    case 'REDEEM_REWARD': {
      const reward = state.rewards.find(r => r.id === action.id);
      if (!reward || state.points < reward.cost) return state;
      
      return {
        ...state,
        points: state.points - reward.cost
      };
    }
    default:
      return state;
  }
};

export const useMotivationStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);
  
  useEffect(() => {
    saveState(state);
  }, [state]);
  
  const addTask = (title: string, points: number): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      points,
      createdAt: Date.now()
    };
    dispatch({ type: 'ADD_TASK', task: newTask });
  };
  
  const editTask = (task: Task): void => {
    dispatch({ type: 'EDIT_TASK', task });
  };
  
  const deleteTask = (id: string): void => {
    dispatch({ type: 'DELETE_TASK', id });
  };
  
  const completeTask = (id: string): void => {
    dispatch({ type: 'COMPLETE_TASK', id });
  };
  
  const addReward = (title: string, cost: number): void => {
    const newReward: Reward = {
      id: crypto.randomUUID(),
      title,
      cost,
      createdAt: Date.now()
    };
    dispatch({ type: 'ADD_REWARD', reward: newReward });
  };
  
  const editReward = (reward: Reward): void => {
    dispatch({ type: 'EDIT_REWARD', reward });
  };
  
  const deleteReward = (id: string): void => {
    dispatch({ type: 'DELETE_REWARD', id });
  };
  
  const redeemReward = (id: string): void => {
    dispatch({ type: 'REDEEM_REWARD', id });
  };

  return {
    ...state,
    addTask,
    editTask,
    deleteTask,
    completeTask,
    addReward,
    editReward,
    deleteReward,
    redeemReward
  };
};