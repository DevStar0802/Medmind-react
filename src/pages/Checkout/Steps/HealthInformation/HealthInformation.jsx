import React, { useState } from 'react';

const textAreas = [
  {
    id: "health-conditions",
    label: "Please list your health conditions.",
    checkbox: "No known health conditions",
    placeholder: "Please press return key after each input.",
  }, {
    id: "medications",
    label: "What medications do you currently take?",
    checkbox: "Not taking other medications",
    placeholder: "Please press return key after each input.",
  }, {
    id: "drug-allergies",
    label: "Please list any drug allergies experience.",
    checkbox: "No known drug allergies",
    placeholder: "Please press return key after each input.",
  },
];


// Define the initial state for the checkboxes based on the textAreas object
const initialCheckboxState = textAreas.reduce((state, item) => {
  state[item.id] = false;
  return state;
}, {});

export default function HealthInformation() {
  // State to hold the checkbox values
  const [checkboxValues, setCheckboxValues] = useState(initialCheckboxState);

  // Handler for checkbox changes
  const handleCheckboxChange = (id, checked) => {
    setCheckboxValues(prevValues => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  return (
    <div className='mx-2'>
      {textAreas.map((area, index) => (
        <div key={index}>
          <div className="mb-1">
            <input
              type="checkbox"
              id={`${area.id}-checkbox`}
              checked={checkboxValues[area.id]}
              onChange={(e) => handleCheckboxChange(area.id, e.target.checked)}
              className="mr-2"
            />
            <label htmlFor={`${area.id}-checkbox`} className="text-sm text-gray-900">
              {area.checkbox}
            </label>
          </div>
          {!checkboxValues[area.id] && (
            <div className="mb-4">
              <label htmlFor={area.id} className="block text-sm font-medium leading-6 text-gray-900">
                {area.label}
              </label>
              <textarea
                rows={4}
                name={area.id}
                id={area.id}
                placeholder={area.placeholder}
                className="block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:ring-indigo-600 focus:border-indigo-600 text-sm"
              />
            </div>
          )}
        </div>
      ))}
      <div className='text-grey text-xs'>
        By continuing, I verify that the above information is correct and complete.
      </div>
      <div className="mb-1">
        <input
          type="checkbox"
          id="agreement-checkbox"
          onChange={(e) => handleCheckboxChange("agreement", e.target.checked)}
          className="mr-2"
        />
        <label htmlFor={`agreement-checkbox`} className="text-sm text-gray-900">
          I agree to Medmind's <a href='/' target='_blank'>Privacy Policy</a> and <a href='/' target='_blank'>Terms & Conditions</a>.
        </label>
      </div>

    </div>
  );
}
