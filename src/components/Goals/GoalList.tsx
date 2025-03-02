import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  Edit,
  Trash2,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { useGoalStore } from '../../store/goalStore';
import type { Goal } from '../../types';

const GoalList: React.FC = () => {
  const { goals, fetchGoals, loading, deleteGoal, toggleGoalCompletion } = useGoalStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);
  
  const handleDeleteGoal = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };
  
  const handleToggleCompletion = async (id: string, completed: boolean) => {
    await toggleGoalCompletion(id, !completed);
  };
  
  // Filter goals based on search term and status filter
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (goal.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'completed' && goal.completed) ||
                         (statusFilter === 'active' && !goal.completed);
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Your Goals</h1>
          <Link
            to="/goals/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Goal
          </Link>
        </div>
        <p className="text-gray-600">Set and track your skill development goals.</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search goals..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            {/* Status Filter */}
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Goals</option>
                <option value="active">Active Goals</option>
                <option value="completed">Completed Goals</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Goals List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading goals...</p>
        </div>
      ) : filteredGoals.length > 0 ? (
        <div className="space-y-4">
          {filteredGoals.map((goal) => (
            <div 
              key={goal.id} 
              className={`bg-white rounded-lg shadow p-4 border-l-4 ${
                goal.completed ? 'border-green-500' : 'border-amber-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <button
                    onClick={() => handleToggleCompletion(goal.id, goal.completed)}
                    className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                      goal.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 text-transparent'
                    } flex items-center justify-center mr-3 mt-1`}
                  >
                    {goal.completed && <CheckCircle className="h-4 w-4" />}
                  </button>
                  <div>
                    <h3 className={`text-lg font-medium ${
                      goal.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {goal.title}
                    </h3>
                    {goal.description && (
                      <p className={`mt-1 text-sm ${
                        goal.completed ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {goal.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Due: {format(new Date(goal.target_date), 'MMM d, yyyy')}</span>
                      
                      {goal.skill_id && (
                        <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Related Skill
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    to={`/goals/${goal.id}/edit`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter
              ? "No goals match your current filters."
              : "You haven't set any goals yet."}
          </p>
          {searchTerm || statusFilter ? (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear filters
            </button>
          ) : (
            <Link
              to="/goals/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" /> Set your first goal
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalList;