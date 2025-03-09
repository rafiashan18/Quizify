import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UserSignupChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Dummy data for monthly user signups
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [45, 62, 78, 95, 110, 132, 145, 155, 168, 172, 180, 210],
        backgroundColor: 'rgba(139, 92, 246, 0.6)', // Very light purple with transparency
        borderColor: '#8b5cf6',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Active Users',
        data: [40, 55, 65, 85, 95, 110, 125, 140, 150, 155, 160, 185],
        backgroundColor: 'rgba(59, 130, 246, 0.5)', // Very light blue with transparency
        borderColor: '#3b82f6',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  useEffect(() => {
    // Destroy existing chart on re-renders
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create chart
    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: monthlyData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)' // Light gray grid lines
            },
            ticks: {
              color: '#6b7280' // Gray text
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280' // Gray text
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#6b7280',
              font: {
                family: "'Inter', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937',
            bodyColor: '#4b5563',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw} users`;
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        elements: {
          point: {
            radius: 3,
            hoverRadius: 5,
            backgroundColor: 'white',
            borderWidth: 2
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white px-4 rounded-xl ">
      <div className="">
        <h3 className="text-lg font-semibold text-purple-800">User Growth (2024)</h3>
        {/* <p className="text-sm text-gray-500">Monthly signups and active users</p> */}
      </div>
      
  
      <div className="h-64 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
      
      {/* Key statistics summary */}
      {/* <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-xs text-purple-600 font-medium">Total Users</p>
          <p className="text-2xl font-bold text-purple-800">1,452</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-600 font-medium">Growth Rate</p>
          <p className="text-2xl font-bold text-blue-800">16.8%</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-xs text-yellow-600 font-medium">Retention</p>
          <p className="text-2xl font-bold text-yellow-800">82%</p>
        </div>
      </div> */}
    </div>
  );
};

export default UserSignupChart;