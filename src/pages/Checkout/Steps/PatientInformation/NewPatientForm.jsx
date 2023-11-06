import { useState, useEffect, useRef } from 'react';
import Button from '../../../../components/Button';

const pet_status = [
  { id: 'is_pet', title: 'Yes', active: false },
  { id: 'is_not_pet', title: 'No', active: true }
];

const gender_status = [
  { id: 'male', title: 'Male', active: false },
  { id: 'female', title: 'Female', active: false },
  { id: 'non_binary', title: 'Non-binary', active: false }
];

const pet_species = [
  { id: 'dog', title: 'Dog', active: true },
  { id: 'cat', title: 'Cat', active: false },
  { id: 'horse', title: 'Horse', active: false },
  { id: 'cow', title: 'Cow', active: false },
  { id: 'other', title: 'Other', active: false },
];

export default function NewPatientForm() {
  const [petStatus, setPetStatus] = useState(pet_status);
  const [genderStatus, setGenderStatus] = useState(gender_status);
  const [petSpecies, setPetSpecies] = useState(pet_species);
  const inputRefs = useRef({});

  const resetState = (id, setter, values) => {
    const updatedActivity = values.map((status) => ({
      active: status.id === id,
      id: status.id,
      title: status.title
    }));

    setter(updatedActivity);

    if (inputRefs.current[id]) {
      inputRefs.current[id].focus();
    }
  };

  useEffect(() => {
    const defaultActive = petStatus.find(petStatus => petStatus.active);
    if (defaultActive && inputRefs.current[defaultActive.id]) {
      inputRefs.current[defaultActive.id].focus();
    }
  }, []);

  return (
    <div className='items-center content-center w-full'>
      <div className="grid place-items-center h-full">
        <label className="text-base font-semibold text-gray-900">Are they a pet?</label>
      </div>
      <fieldset className="my-3">
        <div className="space-y-4 flex items-center space-x-56 space-y-0 sm:ml-0 ml-2">
          {petStatus.map((status) => (
            <div key={status.id} className="flex items-center">
              <input
                id={status.id}
                name="pet-status"
                type="radio"
                defaultChecked={status.active}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                onClick={e => resetState(status.id, setPetStatus, petStatus)}
              />
              <label htmlFor={status.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {status.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <div className="mt-2 grid gap-x-6 gap-y-4 grid-cols-6 sm:ml-0 mx-2">
        <div className="col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-black">
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="text-sm py-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-black">
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autoComplete="family-name"
              className="text-sm py-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-black col-span-2 mt-1">
          Date of birth
        </label>
        <div className="col-span-4">
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            className="text-sm py-1 block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
        <label className="text-base font-semibold text-gray-900 col-span-6 text-center">Gender</label>
        {genderStatus.map((status) => (
          <div className="col-span-2">
            <div key={status.id} className="flex items-center">
              <input
                id={status.id}
                name="gender-status"
                type="radio"
                defaultChecked={status.active}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onClick={() => resetState(status.id, setGenderStatus, genderStatus)}
              />
              <label htmlFor={status.id} className="ml-3 block text-sm font-medium text-gray-900">
                {status.title}
              </label>
            </div>
          </div>
        ))}
        {
          petStatus[0].active && (
            <>
              <label className="text-base font-semibold text-gray-900 col-span-6 text-center">Species</label>
              {pet_species.map((pet_species) => (
                <div className="col-span-2">
                  <div key={pet_species.id} className="flex items-center">
                    <input
                      id={pet_species.id}
                      name="pet-species"
                      type="radio"
                      defaultChecked={pet_species.active}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onClick={() => resetState(pet_species.id, setPetSpecies, petSpecies)}
                    />
                    <label htmlFor={pet_species.id} className="ml-3 block text-sm font-medium text-gray-900">
                      {pet_species.title}
                    </label>
                  </div>
                </div>
              ))}
            </>
          )
        }
      </div>
    </div>
  );
}
