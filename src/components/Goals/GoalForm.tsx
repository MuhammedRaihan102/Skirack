import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Target, Save, ArrowLeft } from 'lucide-react';
import { useGoalStore } from '../../store/goalStore';
import { useSkillStore } from '../../store/skillStore';
import type { Goal } from '../../types';

interface GoalFormProps {
  initialData?: Partial<Goal>;
  isEditing?: boolean;
}

interface GoalFormData {
  title: string;
  description?: string;
  target_date: string;
  skill_id?: string;
  completed: boolean;
}

const GoalForm: React.FC<GoalFormProps> = ({ initialData = {}, isEditing = false }) => {
  const { addGoal, updateGoal, loading: goalLoading } = useGoalStore();
  const { skills, fetchSkills, loading: skillsLoading } = useSkillStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);
  
  const { register, handleSubmit, formState: { errors } } = useForm<GoalFormData>({
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      target_date: initialData.target_date 
        ? new Date(initialData.target_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      skill_id: initialData.skill_id || '',
      completed: initialData.completed || false,
    },
  });
  
  const onSubmit = async (data: GoalFormData) => {
    if (isEditing && initialData.id) {
      await updateGoal(initialData.id, data);
      navigate('/goals');
    } else {
      await addGoal(data);
      navigate('/goals');
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">
          {isEditing ? 'Edit Goal' : 'Add New Goal'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Update your goal details and track your progress.'
            : 'Set a new goal to help you improve your skills.'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Goal Title *
              </label>
              <input
                type="text"
                id="title"
                className={`mt-1 block w-full rounded-md border ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
                placeholder="e.g., Complete JavaScript course, Build a portfolio project"
                {...register('title', { required: 'Goal title is required' })}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Add more details about your goal..."
                {...register('description')}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="target_date" className="block text-sm font-medium text-gray-700">
                Target Date *
              </label>
              <input
                type="date"
                id="target_date"
                className={`mt-1 block w-full rounded-md border ${
                  errors.target_date ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
                {...register('target_date', { required: 'Target date is required' })}
              />
              {errors.target_date && (
                <p className="mt-1 text-sm text-red-600">{errors.target_date.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="skill_id" className="block text-sm font-medium text-gray-700">
                Related Skill (Optional)
              </label>
              <select
                id="skill_id"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                {...register('skill_id')}
              >
                <option value="">None</option>
                {skillsLoading ? (
                  <option disabled>Loading skills...</option>
                ) : (
                  skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            {isEditing && (
              <div className="flex items-center">
                <input
                  id="completed"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  {...register('completed')}
                />
                <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                  Mark as completed
                </label>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={goalLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {goalLoading ? 'Saving...' : isEditing ? 'Update Goal' : 'Add Goal'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;