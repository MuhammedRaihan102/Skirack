export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  subscription_tier: 'free' | 'premium' | 'pro';
}

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface SkillProgress {
  id: string;
  skill_id: string;
  date: string;
  progress_value: number; // 0-100
  notes?: string;
}

export interface Goal {
  id: string;
  user_id: string;
  skill_id?: string;
  title: string;
  description?: string;
  target_date: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  skill_id?: string;
  title: string;
  description?: string;
  reminder_date: string;
  is_recurring: boolean;
  recurrence_pattern?: string; // e.g., "daily", "weekly", "monthly"
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  current_period_end: string;
  created_at: string;
}