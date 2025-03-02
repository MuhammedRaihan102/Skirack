import { createClient } from '@supabase/supabase-js';

// Use default values for development
const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGJyaXBwZWt6YXVhdHJkYWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjY5NzcsImV4cCI6MjAxNTU0Mjk3N30.J8YjN9AKpQ-mODTw47O-GwTIBnT4Jl9nraXVL1ht_rc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);