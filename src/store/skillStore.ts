import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Skill, SkillProgress } from '../types';

interface SkillState {
  skills: Skill[];
  skillProgress: Record<string, SkillProgress[]>;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchSkills: () => Promise<void>;
  fetchSkillProgress: (skillId: string) => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateSkill: (id: string, updates: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addProgressEntry: (entry: Omit<SkillProgress, 'id'>) => Promise<void>;
}

export const useSkillStore = create<SkillState>((set, get) => ({
  skills: [],
  skillProgress: {},
  loading: false,
  error: null,
  
  fetchSkills: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ 
        skills: data || [],
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchSkillProgress: async (skillId) => {
    try {
      set({ loading: true, error: null });
      
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addSkill: async (skill) => {
    try {
      set({ loading: true, error: null });
      
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  updateSkill: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  deleteSkill: async (id) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set(state => ({ 
        skills: state.skills.filter(skill => skill.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  addProgressEntry: async (entry) => {
    try {
      set({ loading: true, error: null });
      
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
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));