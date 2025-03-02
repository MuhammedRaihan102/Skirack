import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Mock data for goals
const mockGoals = [
  {
    id: '1',
    user_id: '123',
    skill_id: '1',
    title: 'Complete JavaScript Course',
    description: 'Finish the Advanced JavaScript course on Udemy',
    target_date: '2023-06-30T00:00:00Z',
    completed: false,
    created_at: '2023-01-15T10:30:00Z',
    updated_at: '2023-01-15T10:30:00Z',
  },
  {
    id: '2',
    user_id: '123',
    skill_id: '2',
    title: 'Build React Project',
    description: 'Create a portfolio project using React and Tailwind CSS',
    target_date: '2023-07-15T00:00:00Z',
    completed: false,
    created_at: '2023-02-20T14:45:00Z',
    updated_at: '2023-02-20T14:45:00Z',
  },
  {
    id: '3',
    user_id: '123',
    skill_id: '3',
    title: 'Give a Presentation',
    description: 'Present a topic at the local meetup group',
    target_date: '2023-05-10T00:00:00Z',
    completed: true,
    created_at: '2023-03-10T09:15:00Z',
    updated_at: '2023-04-15T16:20:00Z',
  },
];

export const useGoalStore = create((set) => ({
  goals: [],
  loading: false,
  error: null,
  
  fetchGoals: async () => {
    try {
      set({ loading: true, error: null });
      
      // Use mock data instead of actual Supabase call
      set({ 
        goals: mockGoals,
        loading: false,
      });
      
      /*
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('target_date', { ascending: true });
      
      if (error) throw error;
      
      set({ 
        goals: data || [],
        loading: false,
      });
      */
    } catch (error) {
      console.error("Goals error:", error);
      set({ error: error.message, loading: false });
    }
  },
  
  addGoal: async (goal) => {
    try {
      set({ loading: true, error: null });
      
      // Create a new mock goal
      const newGoal = {
        id: String(Math.floor(Math.random() * 10000)),
        user_id: '123',
        ...goal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      set(state => ({ 
        goals: [...state.goals, newGoal],
        loading: false,
      }));
      
      /*
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
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateGoal: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
      // Update mock goal
      const updatedGoal = {
        ...mockGoals.find(goal => goal.id === id),
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      set(state => ({ 
        goals: state.goals.map(goal => 
          goal.id === id ? updatedGoal : goal
        ),
        loading: false,
      }));
      
      /*
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
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteGoal: async (id) => {
    try {
      set({ loading: true, error: null });
      
      // Delete mock goal
      set(state => ({ 
        goals: state.goals.filter(goal => goal.id !== id),
        loading: false,
      }));
      
      /*
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set(state => ({ 
        goals: state.goals.filter(goal => goal.id !== id),
        loading: false,
      }));
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  toggleGoalCompletion: async (id, completed) => {
    try {
      set({ loading: true, error: null });
      
      // Toggle mock goal completion
      set(state => ({ 
        goals: state.goals.map(goal => 
          goal.id === id ? { ...goal, completed, updated_at: new Date().toISOString() } : goal
        ),
        loading: false,
      }));
      
      /*
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
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));