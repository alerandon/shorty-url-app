import React from 'react';

const ShortUrlTable: React.FC = () => {
  return (
    <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full mx-auto border-collapse md:text-base text-xs">
        <thead>
          <tr className="text-left border-b border-[#e6e6e6]/40">
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
              Original URL
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
              Short URL
            </th>
            <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-secondary transition-colors duration-200 rounded-2xl">
            <td className="px-4 py-3 md:px-6 md:py-4">Example 1</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 1</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 1</td>
          </tr>
          <tr className="hover:bg-secondary transition-colors duration-200 rounded-2xl">
            <td className="px-4 py-3 md:px-6 md:py-4">Example 2</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 2</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 2</td>
          </tr>
          <tr className="hover:bg-secondary transition-colors duration-200 rounded-2xl">
            <td className="px-4 py-3 md:px-6 md:py-4">Example 3</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 3</td>
            <td className="px-4 py-3 md:px-6 md:py-4">Example 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShortUrlTable;
