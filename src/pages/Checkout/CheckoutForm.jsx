import React, { useState } from 'react';
import Button from '../../components/Button';

export default function 4232dfdfdf({ pages, setPages }) {

  const activateStep = (index) => {
    const resetSteps = pages.map((page) => ({ ...page, current: false }));
    resetSteps[index].current = true;
    setPages(resetSteps);
  };

  const handleNextStep = () => {
    const currentIndex = pages.findIndex(page => page.current);
    if (currentIndex < pages.length - 1) {
      activateStep(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full divide-y items-center w-full">
        {pages.map((page, index) => (
          <div
            key={index}
            className={`flex w-full flex-col items-center text-2xl py-6 ${page.current ? 'bg-gray-200' : ''}`}
            onClick={() => activateStep(index)}
          >
            <span>
              {page.name}
            </span>
            <span className='text-gray-500 text-lg'>
              {page.current ? `(Step ${index + 1} of ${pages.length})` : ``}
            </span>
            {page.current && (
              <>
                <div className='mt-4 justify-center'>
                  {page.component}

                </div>
                <div key={index} className='flex justify-center items-center h-full mt-4'>
                  <Button key={index} buttonText={"Next step"} onClick={handleNextStep}/>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
