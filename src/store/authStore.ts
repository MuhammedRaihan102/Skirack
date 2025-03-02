import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  
  signUp: async (email, password, fullName) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            subscription_tier: 'free',
          },
        },
      });
      
      if (error) throw error;
      
      set({ 
        session: data.session,
        loading: false,
      });
      
      if (data.session) {
        await get().getUser();
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({ 
        session: data.session,
        loading: false,
      });
      
      await get().getUser();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      set({ 
        user: null,
        session: null,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  
  getUser: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: user, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) throw error;
        
        set({ 
          user,
          session,
          loading: false,
        });
      } else {
        set({ 
          user: null,
          session: null,
          loading: false,
        });
      }
    } catch (error: any) {
      set({ 
        user: null,
        error: error.message,
        loading: false,
      });
    }
  },
}));