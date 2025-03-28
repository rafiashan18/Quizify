// UserSignupChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { monthlySignupData } from '../../../constants';

const UserSignupChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: monthlySignupData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            ticks: {
              color: '#6b7280'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6b7280'
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
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white px-4 rounded-xl">
      <div>
        <h3 className="text-lg font-semibold text-purple-800">User Growth (2024)</h3>
      </div>
      <div className="h-64 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default UserSignupChart;
