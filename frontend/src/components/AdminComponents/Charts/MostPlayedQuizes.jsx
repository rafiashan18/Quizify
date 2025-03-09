import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MostPlayedQuizes = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const data = {
    labels: ['Quiz A', 'Quiz B', 'Quiz C', 'Quiz D', 'Quiz E', 'Quiz F', 'Quiz G'],
    datasets: [
      {
        label: 'Times Played',
        data: [1250, 980, 860, 720, 650, 520, 480],
        backgroundColor: [
          'rgba(147, 51, 234, 0.8)', // Purple
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(245, 158, 11, 0.8)', // Yellow
          'rgba(236, 72, 153, 0.7)', // Pink
          'rgba(147, 51, 234, 0.8)', // Purple
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(245, 158, 11, 0.8)', // Yellow
        ],
        borderColor: [
          'rgb(126, 34, 206)', // Darker Purple
          'rgb(37, 99, 235)', // Darker Blue
          'rgb(202, 138, 4)', // Darker Yellow
          'rgb(219, 39, 119)', // Darker Pink
          'rgb(126, 34, 206)', // Darker Purple
          'rgb(37, 99, 235)', // Darker Blue
          'rgb(202, 138, 4)', // Darker Yellow
        ],
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: [
          'rgba(147, 51, 234, 1)', // Purple
          'rgba(59, 130, 246, 1)', // Blue
          'rgba(245, 158, 11, 1)', // Yellow
          'rgba(236, 72, 153, 1)', // Pink
          'rgba(147, 51, 234, 1)', // Purple
          'rgba(59, 130, 246, 1)', // Blue
          'rgba(245, 158, 11, 1)', // Yellow
        ],
      }
    ]
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Most Played Quizzes',
              font: {
                size: 16,
                weight: 'bold',
              },
              color: '#374151', // text-gray-700
              padding: {
                bottom: 20
              }
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
              grid: {
                color: 'rgba(243, 244, 246, 1)', // gray-100
              },
              border: {
                display: false
              },
              ticks: {
                color: '#6B7280', // text-gray-500
                font: {
                  size: 12
                },
                callback: function(value) {
                  return value >= 1000 ? value/1000 + 'k' : value;
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: '#6B7280', // text-gray-500
                font: {
                  size: 12
                }
              }
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
      <div className="h-64">
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