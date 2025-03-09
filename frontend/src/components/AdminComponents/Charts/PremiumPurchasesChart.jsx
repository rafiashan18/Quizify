import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PremiumPurchasesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Dummy data for premium quiz purchases by category
  const purchaseData = {
    labels: ['Science', 'History', 'Math', 'Language', 'Tech'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#8b5cf6', // Purple
          '#3b82f6', // Blue
          '#eab308', // Yellow
          '#c8a3ff', // Light Purple
          '#ff69b4', // Light Pink
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      }
    ]
  };

  useEffect(() => {
    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create chart
    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: purchaseData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 10
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${percentage}% (${value})`;
              }
            }
          }
        },
        cutout: '65%'
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
    <div className='flex justify-center items-center bg-white'>
      <div className="p-5 rounded-xl max-w-full space-y-2">
        {/* Header */}
        <div>
          <h3 className="text-sm font-semibold text-purple-800">Premium Purchases</h3>
          <p className="text-xs text-gray-500 mb-3"> quizzes by category</p>
        </div>

        {/* Chart container - adjusted height for better display */}
        <div className="h-40 w-full">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Additional Insights */}
        <div className="flex flex-col">
          {/* Total Purchases */}
          <div className='flex justify-start items-center'>
            <p className="text-xs text-gray-500 me-2">Total Purchases: </p>
            <p className=" font-bold text-purple-700">483</p>
          </div>

          <div className='space-y-1'>
            {/* Most Purchased Quiz */}
            <div>
              <p className="text-xs text-gray-500">Highest Purchased Quiz</p>
              <p className="text-sm font-medium text-purple-600">Science Mastery Pack (35%)</p>
            </div>

            {/* User Engagement Insight */}
            <div>
              {/* <p className="text-xs text-gray-500">Insight</p> */}
              <p className="text-sm text-gray-700">
                <span className='border-b-2 border-purple-200'>Science</span> & <span className='border-b border-yellow-300'>History</span>  categories are the most popular among premium users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPurchasesChart;
