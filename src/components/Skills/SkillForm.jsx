import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Save, ArrowLeft } from 'lucide-react';
import { useSkillStore } from '../../store/skillStore';

const SkillForm = ({ initialData = {}, isEditing = false }) => {
  const { addSkill, updateSkill, loading, skills } = useSkillStore();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // If editing, find the skill data
  React.useEffect(() => {
    if (isEditing && id && skills.length > 0) {
      const skillToEdit = skills.find(skill => skill.id === id);
      if (skillToEdit) {
        reset({
          name: skillToEdit.name,
          category: skillToEdit.category,
          difficulty: skillToEdit.difficulty,
          priority: skillToEdit.priority,
        });
      }
    }
  }, [isEditing, id, skills]);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: initialData.name || '',
      category: initialData.category || '',
      difficulty: initialData.difficulty || 'beginner',
      priority: initialData.priority || 'medium',
    },
  });
  
  const onSubmit = async (data) => {
    if (isEditing && id) {
      await updateSkill(id, data);
      navigate(`/skills/${id}`);
    } else {
      await addSkill(data);
      navigate('/skills');
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
          {isEditing ? 'Edit Skill' : 'Add New Skill'}
        </h1>
        <p className="text-gray-600">
          {isEditing 
            ? 'Update your skill details and track your progress.'
            : 'Add a new skill to your portfolio and start tracking your progress.'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
                placeholder="e.g., JavaScript, Public Speaking, Piano"
                {...register('name', { required: 'Skill name is required' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <input
                type="text"
                id="category"
                className={`mt-1 block w-full rounded-md border ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
                placeholder="e.g., Programming, Soft Skills, Music"
                {...register('category', { required: 'Category is required' })}
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                Difficulty Level *
              </label>
              <select
                id="difficulty"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                {...register('difficulty')}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority *
              </label>
              <select
                id="priority"
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                {...register('priority')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
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
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : isEditing ? 'Update Skill' : 'Add Skill'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;