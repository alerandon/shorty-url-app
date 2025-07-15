import React from 'react';

const ShortUrlTable: React.FC = () => {
  return (
    <table className="w-full max-w-xl md:max-w-5xl mx-auto mt-16 md:mt-24 bg-[#28213B] rounded-2xl shadow-lg border-collapse md:text-base text-xs">
      <tr>
        <th className="px-5 py-3 md:px-6 md:py-4 text-left">Original URL</th>
        <th className="px-5 py-3 md:px-6 md:py-4 text-left">Short URL</th>
        <th className="px-5 py-3 md:px-6 md:py-4 text-left">Created</th>
      </tr>
      <tr className="hover:bg-[#3d3757] transition-colors duration-200">
        <td className="px-5 py-3 md:px-6 md:py-4">Example 1</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 1</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 1</td>
      </tr>
      <tr className="hover:bg-[#3d3757] transition-colors duration-200">
        <td className="px-5 py-3 md:px-6 md:py-4">Example 2</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 2</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 2</td>
      </tr>
      <tr className="hover:bg-[#3d3757] transition-colors duration-200">
        <td className="px-5 py-3 md:px-6 md:py-4">Example 3</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 3</td>
        <td className="px-5 py-3 md:px-6 md:py-4">Example 3</td>
      </tr>
    </table>
  );
};

export default ShortUrlTable;
