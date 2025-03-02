import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  TrendingUp, 
  Target,
  Plus,
  Calendar,
  Clock,
  Award,
  BookOpen as BookOpenIcon,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { useSkillStore } from '../../store/skillStore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { skills, fetchSkills, deleteSkill, loading } = useSkillStore();
  const [skill, setSkill] = useState(null);
  
  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);
  
  useEffect(() => {
    if (skills.length > 0 && id) {
      const foundSkill = skills.find(s => s.id === id);
      if (foundSkill) {
        setSkill(foundSkill);
      } else {
        navigate('/skills');
      }
    }
  }, [skills, id, navigate]);
  
  const handleDeleteSkill = async () => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      if (id) {
        await deleteSkill(id);
        navigate('/skills');
      }
    }
  };
  
  // Mock progress data - in a real app, this would come from the database
  const progressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Skill Progress',
        data: [10, 25, 32, 45, 60, 75],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };
  
  // Mock recommendations - in a real app, these would be generated based on the skill
  const recommendations = [
    {
      id: 1,
      type: 'course',
      title: 'Complete Course on Udemy',
      description: 'A comprehensive course covering all aspects of this skill.',
      link: 'https://udemy.com',
    },
    {
      id: 2,
      type: 'book',
      title: 'Essential Reading',
      description: 'The definitive guide to mastering this skill.',
      link: 'https://amazon.com',
    },
    {
      id: 3,
      type: 'practice',
      title: 'Daily Practice Routine',
      description: 'Spend 30 minutes each day practicing specific techniques.',
    },
  ];
  
  if (loading || !skill) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading skill details...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate('/skills')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Skills
        </button>
        
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-bold text-gray-900">{skill.name}</h1>
          <div className="flex space-x-2">
            <Link
              to={`/skills/${id}/edit`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Link>
            <button
              onClick={handleDeleteSkill}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {skill.category}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            skill.difficulty === 'beginner' 
              ? 'bg-green-100 text-green-800' 
              : skill.difficulty === 'intermediate'
              ? 'bg-blue-100 text-blue-800'
              : skill.difficulty === 'advanced'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {skill.difficulty.charAt(0).toUpperCase() + skill.difficulty.slice(1)}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            skill.priority === 'high' 
              ? 'bg-red-100 text-red-800' 
              : skill.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)} Priority
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Progress Over Time</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add Progress
              </button>
            </div>
            <div className="h-64">
              <Line options={chartOptions} data={progressData} />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Current progress: <span className="font-semibold text-indigo-600">75%</span>
              </div>
              <div className="text-sm text-gray-500">
                Started: <span className="font-semibold">{format(new Date(skill.created_at), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
          
          {/* Improvement Suggestions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {recommendation.type === 'course' ? (
                        <BookOpenIcon className="h-5 w-5 text-indigo-500" />
                      ) : recommendation.type === 'book' ? (
                        <BookOpen className="h-5 w-5 text-purple-500" />
                      ) : (
                        <Target className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{recommendation.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{recommendation.description}</p>
                      {recommendation.link && (
                        <a 
                          href={recommendation.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View resource <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Overall Progress</p>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                    <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>75%</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">Time Invested</p>
                  <span className="text-sm font-medium text-gray-900">45 hours</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-500">Last Practice</p>
                  <span className="text-sm font-medium text-gray-900">2 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Practice Frequency</p>
                  <span className="text-sm font-medium text-gray-900">3 times/week</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Goals */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Related Goals</h2>
              <Link to="/goals/new" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add Goal
              </Link>
            </div>
            
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-900">Complete online course</h3>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Due in 2 weeks</span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-gray-900">Build a practice project</h3>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Due in 1 month</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Practice Reminders */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Practice Reminders</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center">
                <Plus className="h-4 w-4 mr-1" /> Add Reminder
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Daily Practice</p>
                    <p className="text-xs text-gray-500">Every day at 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Weekly Review</p>
                    <p className="text-xs text-gray-500">Every Sunday at 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetail;