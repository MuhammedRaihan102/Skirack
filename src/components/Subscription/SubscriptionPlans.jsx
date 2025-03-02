import React from 'react';
import { Check, X, CreditCard } from 'lucide-react';

const SubscriptionPlans = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-gray-600">Choose the plan that best fits your needs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Free</h2>
            <p className="mt-1 text-gray-500">Get started with basic features</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">$0</p>
            <p className="text-gray-500">per month</p>
            
            <button className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Current Plan
            </button>
          </div>
          <div className="px-6 pt-6 pb-8 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Track up to 5 skills</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Basic progress tracking</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Set up to 3 goals</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-gray-400" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-gray-400" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Premium Plan */}
        <div className="bg-white rounded-lg shadow overflow-hidden border-2 border-indigo-500">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Premium</h2>
                <p className="mt-1 text-gray-500">Most popular choice</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Popular
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">$9.99</p>
            <p className="text-gray-500">per month</p>
            
            <button className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Upgrade to Premium
            </button>
          </div>
          <div className="px-6 pt-6 pb-8 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Track unlimited skills</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Advanced progress tracking</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Set unlimited goals</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Advanced analytics</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-gray-400" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Pro</h2>
            <p className="mt-1 text-gray-500">For serious skill development</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">$19.99</p>
            <p className="text-gray-500">per month</p>
            
            <button className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Upgrade to Pro
            </button>
          </div>
          <div className="px-6 pt-6 pb-8 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Everything in Premium</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">AI-powered recommendations</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Custom learning paths</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Expert community access</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <span className="ml-3 text-sm text-gray-500">Priority support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <CreditCard className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Need help choosing a plan?</h3>
            <p className="text-gray-500">Contact our support team for personalized recommendations.</p>
          </div>
          <div className="ml-auto">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;