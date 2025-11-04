'use client';
import React from 'react'

const FinalUI = ({disable, viewtrip}: {disable: boolean, viewtrip: () => void}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🎉 Your Trip is Generating
        </h2>
        <p className="text-gray-600">
          We're creating the perfect itinerary for you...
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="text-gray-600">Planning your adventure</span>
      </div>
      
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2"
        disabled={disable}
        onClick={viewtrip}
      >
        <span>View Trip</span>
        <div className="animate-pulse">✈️</div>
      </button>
    </div>
  );
};

export default FinalUI;