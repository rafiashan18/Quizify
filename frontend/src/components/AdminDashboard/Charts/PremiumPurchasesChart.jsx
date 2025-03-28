import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { purchaseData } from '../../../constants';

const PremiumPurchasesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: purchaseData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { boxWidth: 12, padding: 10, font: { size: 10 } }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: ${percentage}% (${value})`;
              }
            }
          }
        },
        cutout: '65%'
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className='flex justify-start md:justify-center items-center bg-white'>
      <div className="p-5 rounded-xl max-w-full space-y-2">
        <h3 className="text-lg font-semibold text-purple-800">Premium Purchases</h3>
        <p className="text-xs text-gray-500 mb-3">Quizzes by category</p>

        <div className="h-40 w-full">
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="flex flex-col">
          <div className='flex justify-start items-center'>
            <p className="text-xs text-gray-500 me-2">Total Purchases: </p>
            <p className="font-bold text-purple-700">483</p>
          </div>

          <div className='space-y-1'>
            <div>
              <p className="text-xs text-gray-500">Highest Purchased Quiz</p>
              <p className="text-sm font-medium text-purple-600">Science Mastery Pack (35%)</p>
            </div>

            <div>
              <p className="text-sm text-gray-700">
                <span className='border-b-2 border-purple-200'>Science</span> & <span className='border-b border-yellow-300'>History</span> categories are the most popular among premium users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPurchasesChart;
