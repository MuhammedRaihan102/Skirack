import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Goal } from '../types';

interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  toggleGoalCompletion: (id: string, completed: boolean) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  loading: false,
  error: null,
  
  fetchGoals: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('target_date', { ascending: true });
      
      if (error) throw error;
      
      set({ 
        goals: data || [],
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addGoal: async (goal) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('goals')
        .insert([{
          ...goal,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;
      
      set(state => ({ 
        goals: [...state.goals, data[0]],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateGoal: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('goals')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      set(state => ({ 
        goals: state.goals.map(goal => 
          goal.id === id ? { ...goal, ...data[0] } : goal
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteGoal: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set(state => ({ 
        goals: state.goals.filter(goal => goal.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  toggleGoalCompletion: async (id, completed) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('goals')
        .update({
          completed,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      set(state => ({ 
        goals: state.goals.map(goal => 
          goal.id === id ? { ...goal, ...data[0] } : goal
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));