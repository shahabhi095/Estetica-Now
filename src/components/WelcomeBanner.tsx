import React from 'react';

const WelcomeBanner: React.FC = () => (
  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 md:px-6 py-4 md:py-6 border-b border-gray-200">
    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Welcome Back, Rajesh</h2>
    <p className="text-sm md:text-base text-gray-600 mt-1">Hello, here you can manage your orders by zone</p>
  </div>
);

export default WelcomeBanner;