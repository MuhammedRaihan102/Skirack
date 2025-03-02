import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  Plus,
  ChevronRight
} from 'lucide-react';
import { useSkillStore } from '../../store/skillStore';
import { useGoalStore } from '../../store/goalStore';
import SkillProgressChart from './SkillProgressChart';
import RecentActivityList from './RecentActivityList';
import UpcomingGoalsList from './UpcomingGoalsList';

const DashboardOverview = () => {
  const { skills, fetchSkills, loading: skillsLoading } = useSkillStore();
  const { goals, fetchGoals, loading: goalsLoading } = useGoalStore();
  
  useEffect(() => {
    fetchSkills();
    fetchGoals();
  }, [fetchSkills, fetchGoals]);
  
  // Calculate stats
  const totalSkills = skills.length;
  const inProgressSkills = skills.filter(skill => 
    skill.priority === 'high' || skill.priority === 'medium'
  ).length;
  const upcomingGoals = goals.filter(goal => !goal.completed).length;
  const completedGoals = goals.filter(goal => goal.completed).length;
  
  // Get top skills (by priority)
  const topSkills = [...skills]
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your skills and progress.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-indigo-100 p-3 mr-4">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Skills</p>
            <p className="text-2xl font-semibold text-gray-900">{totalSkills}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-emerald-100 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-semibold text-gray-900">{inProgressSkills}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <Target className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Upcoming Goals</p>
            <p className="text-2xl font-semibold text-gray-900">{upcomingGoals}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Goals</p>
            <p className="text-2xl font-semibold text-gray-900">{completedGoals}</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Skill Progress</h2>
              <Link to="/skills" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <SkillProgressChart skills={skills.slice(0, 5)} />
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
            </div>
            <RecentActivityList />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Skills */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Skills</h2>
              <Link to="/skills/new" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add new
              </Link>
            </div>
            
            {skillsLoading ? (
              <p className="text-gray-500">Loading skills...</p>
            ) : topSkills.length > 0 ? (
              <div className="space-y-3">
                {topSkills.map((skill) => (
                  <Link 
                    key={skill.id} 
                    to={`/skills/${skill.id}`}
                    className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.category}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        skill.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : skill.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 mb-2">No skills added yet</p>
                <Link 
                  to="/skills/new"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add your first skill
                </Link>
              </div>
            )}
          </div>
          
          {/* Upcoming Goals */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Goals</h2>
              <Link to="/goals" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {goalsLoading ? (
              <p className="text-gray-500">Loading goals...</p>
            ) : (
              <UpcomingGoalsList goals={goals.filter(g => !g.completed).slice(0, 3)} />
            )}
          </div>
          
          {/* Time Spent */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Time Spent This Week</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center py-6">
              <p className="text-3xl font-bold text-indigo-600">12h 30m</p>
              <p className="text-sm text-gray-500 mt-1">+2.5h from last week</p>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">65% of your weekly goal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;