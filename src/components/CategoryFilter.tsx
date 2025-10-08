import React from 'react';

export const CategoryFilter: React.FC<{
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}> = ({ categories, selected, onSelect }) => (
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {categories.map(category => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm md:text-base ${
          selected === category
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);