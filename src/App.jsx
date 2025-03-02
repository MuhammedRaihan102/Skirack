import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Auth Components
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// Dashboard Components
import DashboardOverview from './components/Dashboard/DashboardOverview';

// Skills Components
import SkillList from './components/Skills/SkillList';
import SkillDetail from './components/Skills/SkillDetail';
import SkillForm from './components/Skills/SkillForm';

// Goals Components
import GoalList from './components/Goals/GoalList';
import GoalForm from './components/Goals/GoalForm';

// Community Components
import CommunityFeed from './components/Community/CommunityFeed';

// Subscription Components
import SubscriptionPlans from './components/Subscription/SubscriptionPlans';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { getUser } = useAuthStore();
  
  useEffect(() => {
    // Call getUser to initialize the auth state
    getUser();
  }, [getUser]);
  
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          
          {/* Skills Routes */}
          <Route path="skills" element={<SkillList />} />
          <Route path="skills/new" element={<SkillForm />} />
          <Route path="skills/:id" element={<SkillDetail />} />
          <Route path="skills/:id/edit" element={<SkillForm isEditing={true} />} />
          
          {/* Goals Routes */}
          <Route path="goals" element={<GoalList />} />
          <Route path="goals/new" element={<GoalForm />} />
          <Route path="goals/:id/edit" element={<GoalForm isEditing={true} />} />
          
          {/* Community Routes */}
          <Route path="community" element={<CommunityFeed />} />
          
          {/* Subscription Routes */}
          <Route path="subscription" element={<SubscriptionPlans />} />
        </Route>
        
        {/* Redirect all other routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;