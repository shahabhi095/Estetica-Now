import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiChevronLeft } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';

interface HeaderProps {
  totalItems: number;
  onCartClick: () => void;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ totalItems, onCartClick, showBackButton }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {showBackButton ? (
              <button 
                onClick={() => navigate('/products')} 
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-700"
              >
                <FiChevronLeft size={24} />
              </button>
            ) : (
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-700">
                <AiOutlineMenu size={24} />
              </button>
            )}
            
            <button onClick={() => navigate('/products')} className="cursor-pointer focus:outline-none">
              <h1 className="text-lg md:text-2xl font-bold text-indigo-600">Estetica</h1>
            </button>

            {/* Welcome Text - Desktop Only, Horizontal */}
            {!showBackButton && (
              <div className="hidden lg:flex flex-col ml-4">
                <h2 className="text-base font-semibold text-gray-900 leading-tight">Welcome Back, Rajesh</h2>
                <p className="text-xs text-gray-600">Hello, here you can manage your orders by zone</p>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - Desktop Only */}
            <div className="relative hidden lg:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 xl:w-64"
              />
            </div>

            {/* Notification Bell */}
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 md:p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                AD
              </div>
              <span className="hidden md:inline font-medium text-sm">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;