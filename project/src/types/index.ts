export interface Task {
  id: string;
  title: string;
  points: number;
  createdAt: number;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  createdAt: number;
}

export type ActionType = 
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'EDIT_TASK'; task: Task }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'COMPLETE_TASK'; id: string }
  | { type: 'ADD_REWARD'; reward: Reward }
  | { type: 'EDIT_REWARD'; reward: Reward }
  | { type: 'DELETE_REWARD'; id: string }
  | { type: 'REDEEM_REWARD'; id: string };

export interface AppState {
  tasks: Task[];
  rewards: Reward[];
  points: number;
}