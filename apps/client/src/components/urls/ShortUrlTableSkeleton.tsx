import React from 'react';

const rowBase = 'h-5 bg-white/10 rounded animate-pulse';

export const ShortUrlTableSkeleton: React.FC<{ rows?: number }> = ({
  rows = 6,
}) => {
  return (
    <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-visible">
      <table className="w-full mx-auto border-collapse md:text-base text-xs">
        <thead>
          <tr className="text-left border-b border-white/10">
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-40 font-medium">
              Original URL
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-40 font-medium">
              Short URL
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-40 font-medium">
              Created
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-40 font-medium text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b border-white/5 last:border-b-0">
              <td className="px-4 py-3 md:px-6 md:py-4">
                <div className={`${rowBase} w-52 md:w-80`}></div>
              </td>
              <td className="px-4 py-3 md:px-6 md:py-4">
                <div className={`${rowBase} w-36 md:w-56`}></div>
              </td>
              <td className="px-4 py-3 md:px-6 md:py-4">
                <div className={`${rowBase} w-20 md:w-28`}></div>
              </td>
              <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                <div className={`${rowBase} w-16 md:w-20 ml-auto`}></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortUrlTableSkeleton;
