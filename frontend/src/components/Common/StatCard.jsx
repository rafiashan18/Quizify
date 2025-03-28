import React from 'react';

const StatCard = ({ title, value, icon, description = '', index }) => {
  // Define color themes (light bg, dark icon, light border, dark hover border)
  const colorThemes = [
    {
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-700',
      borderColor: 'border-purple-300',
      hoverBorderColor: 'hover:border-purple-500',
      iconBg: 'bg-purple-50'
    },
    {
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-700',
      borderColor: 'border-blue-300',
      hoverBorderColor: 'hover:border-blue-500',
      iconBg: 'bg-blue-50'
    },
    {
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-700',
      borderColor: 'border-yellow-300',
      hoverBorderColor: 'hover:border-yellow-400',
      iconBg: 'bg-yellow-50'
    },
    {
      bgColor: 'bg-pink-100',
      iconColor: 'text-pink-700',
      borderColor: 'border-pink-300',
      hoverBorderColor: 'hover:border-pink-400',
      iconBg: 'bg-pink-50'
    }
  ];

  const theme = colorThemes[index % colorThemes.length];

  return (
    <div 
      className={`group rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
      bg-white p-4 border-b-2 ${theme.borderColor} hover:border-b-4 ${theme.hoverBorderColor}`}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col items-start">
          <p className="text-gray-700 text-lg font-medium whitespace-nowrap">{title}</p>
          <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        </div>
        
        {/* Icon Section */}
        <div className={`p-2 rounded-lg ${theme.iconBg}`}>
          <div className={theme.iconColor}>
            {icon}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div>
        {description && (
          <p className="text-sm font-semibold text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;