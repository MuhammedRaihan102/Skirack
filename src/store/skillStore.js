import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Mock data for skills
const mockSkills = [
  {
    id: '1',
    user_id: '123',
    name: 'JavaScript',
    category: 'Programming',
    difficulty: 'intermediate',
    priority: 'high',
    created_at: '2023-01-15T10:30:00Z',
    updated_at: '2023-01-15T10:30:00Z',
  },
  {
    id: '2',
    user_id: '123',
    name: 'React',
    category: 'Programming',
    difficulty: 'advanced',
    priority: 'high',
    created_at: '2023-02-20T14:45:00Z',
    updated_at: '2023-02-20T14:45:00Z',
  },
  {
    id: '3',
    user_id: '123',
    name: 'Public Speaking',
    category: 'Soft Skills',
    difficulty: 'beginner',
    priority: 'medium',
    created_at: '2023-03-10T09:15:00Z',
    updated_at: '2023-03-10T09:15:00Z',
  },
  {
    id: '4',
    user_id: '123',
    name: 'Spanish',
    category: 'Language',
    difficulty: 'beginner',
    priority: 'low',
    created_at: '2023-04-05T16:20:00Z',
    updated_at: '2023-04-05T16:20:00Z',
  },
];

export const useSkillStore = create((set, get) => ({
  skills: [],
  skillProgress: {},
  loading: false,
  error: null,
  
  fetchSkills: async () => {
    try {
      set({ loading: true, error: null });
      
      // Use mock data instead of actual Supabase call
      set({ 
        skills: mockSkills,
        loading: false,
      });
      
      /*
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ 
        skills: data || [],
        loading: false,
      });
      */
    } catch (error) {
      console.error("Skills error:", error);
      set({ error: error.message, loading: false });
    }
  },
  
  fetchSkillProgress: async (skillId) => {
    try {
      set({ loading: true, error: null });
      
      // Mock progress data
      const mockProgress = [
        { id: '1', skill_id: skillId, date: '2023-01-20T10:00:00Z', progress_value: 20, notes: 'Started learning' },
        { id: '2', skill_id: skillId, date: '2023-02-15T10:00:00Z', progress_value: 40, notes: 'Making progress' },
        { id: '3', skill_id: skillId, date: '2023-03-10T10:00:00Z', progress_value: 60, notes: 'Getting better' },
        { id: '4', skill_id: skillId, date: '2023-04-05T10:00:00Z', progress_value: 75, notes: 'Almost there' },
      ];
      
      set(state => ({ 
        skillProgress: {
          ...state.skillProgress,
          [skillId]: mockProgress,
        },
        loading: false,
      }));
      
      /*
      const { data, error } = await supabase
        .from('skill_progress')
        .select('*')
        .eq('skill_id', skillId)
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      set(state => ({ 
        skillProgress: {
          ...state.skillProgress,
          [skillId]: data || [],
        },
        loading: false,
      }));
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  addSkill: async (skill) => {
    try {
      set({ loading: true, error: null });
      
      // Create a new mock skill
      const newSkill = {
        id: String(Math.floor(Math.random() * 10000)),
        user_id: '123',
        ...skill,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      set(state => ({ 
        skills: [newSkill, ...state.skills],
        loading: false,
      }));
      
      /*
      const { data, error } = await supabase
        .from('skills')
        .insert([{
          ...skill,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select();
      
      if (error) throw error;
      
      set(state => ({ 
        skills: [data[0], ...state.skills],
        loading: false,
      }));
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateSkill: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
      // Update mock skill
      const updatedSkill = {
        ...get().skills.find(skill => skill.id === id),
        ...updates,
        updated_at: new Date().toISOString(),
      };
      
      set(state => ({ 
        skills: state.skills.map(skill => 
          skill.id === id ? updatedSkill : skill
        ),
        loading: false,
      }));
      
      /*
      const { data, error } = await supabase
        .from('skills')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      set(state => ({ 
        skills: state.skills.map(skill => 
          skill.id === id ? { ...skill, ...data[0] } : skill
        ),
        loading: false,
      }));
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteSkill: async (id) => {
    try {
      set({ loading: true, error: null });
      
      // Delete mock skill
      set(state => ({ 
        skills: state.skills.filter(skill => skill.id !== id),
        loading: false,
      }));
      
      /*
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set(state => ({ 
        skills: state.skills.filter(skill => skill.id !== id),
        loading: false,
      }));
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  addProgressEntry: async (entry) => {
    try {
      set({ loading: true, error: null });
      
      // Add mock progress entry
      const newEntry = {
        id: String(Math.floor(Math.random() * 10000)),
        ...entry,
      };
      
      set(state => {
        const currentProgress = state.skillProgress[entry.skill_id] || [];
        
        return { 
          skillProgress: {
            ...state.skillProgress,
            [entry.skill_id]: [...currentProgress, newEntry],
          },
          loading: false,
        };
      });
      
      /*
      const { data, error } = await supabase
        .from('skill_progress')
        .insert([entry])
        .select();
      
      if (error) throw error;
      
      set(state => {
        const currentProgress = state.skillProgress[entry.skill_id] || [];
        
        return { 
          skillProgress: {
            ...state.skillProgress,
            [entry.skill_id]: [...currentProgress, data[0]],
          },
          loading: false,
        };
      });
      */
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));