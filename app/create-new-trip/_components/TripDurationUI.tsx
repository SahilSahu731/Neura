'use client';
import React, { useState } from 'react'

const TripDurationUI = ({ onSelectOption }: any) => {
  const [days, setDays] = useState(3);

  const handleIncrement = () => {
    if (days < 30) setDays(days + 1);
  };

  const handleDecrement = () => {
    if (days > 1) setDays(days - 1);
  };

  const handleConfirm = () => {
    onSelectOption(`${days} days`);
  };

  return (
    <div className="flex flex-col items-center mt-4 space-y-6">
      <div className="flex items-center space-x-6">
        <button
          onClick={handleDecrement}
          className="w-12 h-12 rounded-full bg-blue-500 text-white text-2xl font-bold hover:bg-blue-600 transition-colors"
          disabled={days <= 1}
        >
          -
        </button>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800">{days}</div>
          <div className="text-lg text-gray-500">days</div>
        </div>
        
        <button
          onClick={handleIncrement}
          className="w-12 h-12 rounded-full bg-blue-500 text-white text-2xl font-bold hover:bg-blue-600 transition-colors"
          disabled={days >= 30}
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleConfirm}
        className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Confirm Duration
      </button>
    </div>
  );
};

export default TripDurationUI;