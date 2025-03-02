import React from 'react';
import { format } from 'date-fns';
import { Target, Calendar, CheckCircle } from 'lucide-react';
import { useGoalStore } from '../../store/goalStore';

const UpcomingGoalsList = ({ goals }) => {
  const { toggleGoalCompletion } = useGoalStore();
  
  const handleToggleCompletion = (id, completed) => {
    toggleGoalCompletion(id, !completed);
  };
  
  return (
    <div className="space-y-3">
      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.id} className="flex items-start p-3 border border-gray-200 rounded-md">
            <div className="flex-shrink-0 mr-3">
              <Target className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">{goal.title}</p>
                <button
                  onClick={() => handleToggleCompletion(goal.id, goal.completed)}
                  className="ml-2 text-gray-400 hover:text-green-500"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              </div>
              {goal.description && (
                <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
              )}
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(goal.target_date), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          <Target className="h-10 w-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No upcoming goals</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingGoalsList;