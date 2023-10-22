import React, { useState } from 'react';
import PatientInformation from './Steps/PatientInformation';

export default function CheckoutForm({pages, setPages}) {
  const activateStep = (index) => {
    // Reset all steps to inactive
    const resetSteps = pages.map((page) => ({ ...page, current: false }));
    // Set the selected step to active
    resetSteps[index].current = true;
    // Update the steps state
    setPages(resetSteps);
  };

  return (
    <>
      <div className="grid max-w-l w-full grid-rows-5 divide-y">
        {pages.map((page, index) => (
          <div 
            key={index} 
            className={`flex items-center text-2xl py-6 justify-start pl-36 ${page.current ? 'bg-gray-200' : ''}`}
            onClick={() => activateStep(index)}
          >
            <span>
              {page.name}
            </span>
            <span className='text-gray-500 text-lg ml-4'>
              {page.current ? `(Step ${index + 1} of ${pages.length})` : ``}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
