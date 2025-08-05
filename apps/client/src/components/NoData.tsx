import React from 'react';

const NoData: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[450px] text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-white">No hay URLs todavía</h3>
      <p className="text-gray-400 mt-2">¡Acorta una URL para verla aquí!</p>
    </div>
  );
};

export default NoData;
