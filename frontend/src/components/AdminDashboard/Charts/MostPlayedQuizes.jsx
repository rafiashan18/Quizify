import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { MostPlayedQuizesData } from '../../../constants';

const MostPlayedQuizes = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: MostPlayedQuizesData, 
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Most Played Quizzes',
              font: { size: 16, weight: 'bold' },
              color: '#374151', // text-gray-700
              padding: { bottom: 20 }
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              titleColor: '#1F2937', // text-gray-800
              bodyColor: '#4B5563', // text-gray-600
              borderColor: '#E5E7EB', // border-gray-200
              borderWidth: 1,
              displayColors: false,
              padding: 10,
              callbacks: {
                label: function(context) {
                  return context.raw.toLocaleString() + ' plays';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(243, 244, 246, 1)' }, // gray-100
              border: { display: false },
              ticks: {
                color: '#6B7280', // text-gray-500
                font: { size: 12 },
                callback: function(value) {
                  return value >= 1000 ? value / 1000 + 'k' : value;
                }
              }
            },
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: '#6B7280', font: { size: 12 } }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Most Played Quizzes</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">This Week</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full cursor-pointer hover:bg-gray-200">All Time</span>
        </div>
      </div>
      <div className="h-64 w-full mediumSizeChart ">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm text-gray-600">Purple = New Quizzes</span>
          </div>
          <span className="text-xs text-pink-500 font-medium">
            +12.5% from last week
          </span>
        </div>
      </div>
    </div>
  );
};

export default MostPlayedQuizes;
