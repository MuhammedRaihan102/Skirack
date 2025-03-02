import React from 'react';
import { format } from 'date-fns';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  CheckCircle
} from 'lucide-react';

// Mock data - in a real app, this would come from the database
const activities = [
  {
    id: 1,
    type: 'skill_progress',
    title: 'Updated progress on JavaScript',
    description: 'Increased progress to 75%',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 2,
    type: 'goal_completed',
    title: 'Completed goal',
    description: 'Finish React course on Udemy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 3,
    type: 'skill_added',
    title: 'Added new skill',
    description: 'TypeScript - Advanced',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: 4,
    type: 'goal_added',
    title: 'Set new goal',
    description: 'Build a full-stack application',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
];

const getActivityIcon = (type) => {
  switch (type) {
    case 'skill_added':
      return <BookOpen className="h-5 w-5 text-indigo-500" />;
    case 'skill_progress':
      return <TrendingUp className="h-5 w-5 text-emerald-500" />;
    case 'goal_added':
      return <Target className="h-5 w-5 text-amber-500" />;
    case 'goal_completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Award className="h-5 w-5 text-purple-500" />;
  }
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
};

const RecentActivityList = () => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
          </div>
          <div className="flex-shrink-0 ml-3">
            <p className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivityList;