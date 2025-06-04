import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
        <p className="text-lg font-semibold text-gray-700 font-satoshi">Loading...</p>
      </div>
    </div>
  );
}