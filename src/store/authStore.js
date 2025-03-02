import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: false, // Changed from true to false to prevent initial loading state
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  getUser: async () => {
    try {
      set({ loading: true, error: null });
      
      // Mock user for development
      set({
        user: {
          id: '123',
          email: 'user@example.com',
          full_name: 'Test User',
          subscription_tier: 'free',
          created_at: new Date().toISOString()
        },
        loading: false
      });
      
      // Comment out actual Supabase call for now
      /*
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
      */
    } catch (error) {
      console.error("Auth error:", error);
      set({ 
        user: null,
        error: error.message,
        loading: false,
      });
    }
  },
}));