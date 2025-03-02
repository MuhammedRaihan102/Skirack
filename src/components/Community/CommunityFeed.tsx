import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus,
  Search
} from 'lucide-react';

// Mock data - in a real app, this would come from the database
const posts = [
  {
    id: 1,
    user: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    title: 'How I improved my JavaScript skills in 3 months',
    content: 'I wanted to share my journey of improving my JavaScript skills. I started with basic concepts and gradually moved to more advanced topics like closures, promises, and async/await...',
    likes: 24,
    comments: 8,
    created_at: '2023-06-15T10:30:00Z',
  },
  {
    id: 2,
    user: {
      id: 'user2',
      name: 'Sarah Miller',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    title: 'My experience learning piano as an adult',
    content: 'Many people think it\'s too late to learn piano as an adult, but I\'m here to tell you it\'s not! I started at 35 and after consistent practice for a year, I can now play several intermediate pieces...',
    likes: 42,
    comments: 15,
    created_at: '2023-06-10T14:20:00Z',
  },
  {
    id: 3,
    user: {
      id: 'user3',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    title: 'The best resources for learning public speaking',
    content: 'After struggling with public speaking anxiety for years, I finally found a system that works for me. Here are the top resources that helped me overcome my fear and become a confident speaker...',
    likes: 36,
    comments: 12,
    created_at: '2023-06-05T09:15:00Z',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const CommunityFeed: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Plus className="h-4 w-4 mr-2" /> Create Post
          </button>
        </div>
        <p className="text-gray-600">Connect with others, share your progress, and learn from the community.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{post.user.name}</h3>
                    <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-indigo-600">
                      <Heart className="h-5 w-5 mr-1" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-indigo-600">
                      <MessageSquare className="h-5 w-5 mr-1" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-indigo-600">
                      <Share2 className="h-5 w-5 mr-1" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500">
                    Read more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Community Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Members</span>
                </div>
                <span className="text-sm font-medium text-gray-900">1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Posts</span>
                </div>
                <span className="text-sm font-medium text-gray-900">3,872</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">Likes</span>
                </div>
                <span className="text-sm font-medium text-gray-900">12.5k</span>
              </div>
            </div>
          </div>
          
          {/* Top Contributors */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User" 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Michael Chen</h3>
                  <p className="text-xs text-gray-500">124 posts · 1.2k likes</p>
                </div>
              </div>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User" 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Sarah Miller</h3>
                  <p className="text-xs text-gray-500">98 posts · 876 likes</p>
                </div>
              </div>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="User" 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Alex Johnson</h3>
                  <p className="text-xs text-gray-500">76 posts · 654 likes</p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-500">
              View all contributors
            </button>
          </div>
          
          {/* Popular Topics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                JavaScript
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Public Speaking
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                Design
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Language Learning
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Music
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Productivity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;