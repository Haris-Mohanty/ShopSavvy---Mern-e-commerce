import React from 'react';

const ProgressBar = ({ currentStatus }) => {
  const statusSteps = ['Created', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const currentIndex = statusSteps.indexOf(currentStatus);

  const isCancelled = currentStatus === 'Cancelled';

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between mb-1 text-xs sm:text-sm">
        {statusSteps.map((status, index) => (
          <span
            key={index}
            className={`${
              currentIndex >= index && !isCancelled ? 'text-primary-700' : 'text-gray-400'
            }`}
          >
            {status}
          </span>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-300 rounded">
        <div
          className={`absolute top-0 left-0 h-2 ${
            isCancelled ? 'bg-red-600' : 'bg-primary-700'
          } rounded`}
          style={{ width: isCancelled ? '100%' : `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
