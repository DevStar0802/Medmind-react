import Button from "../../../../components/Button"
import { useState, useEffect, useRef } from 'react'
import NewPatientForm from "./NewPatientForm";

const patientStatus = [
  { id: 'me', title: 'Me', active: true },
  { id: 'someone_else', title: 'Add New', active: false }
]

export default function PatientInfo() {
  const [activity, setActivity] = useState(patientStatus);
  const inputRefs = useRef({});

  const resetActivity = (id) => {
    const updatedActivity = activity.map((patientStatus) => ({
      ...patientStatus,
      active: patientStatus.id === id
    }));

    setActivity(updatedActivity);

    if (inputRefs.current[id]) {
      inputRefs.current[id].focus();
    }
  };

  useEffect(() => {
    const defaultActive = activity.find(method => method.active);
    if (defaultActive && inputRefs.current[defaultActive.id]) {
      inputRefs.current[defaultActive.id].focus();
    }
  }, [])

  return (
    <div className="items-center w-full">
      <div className="grid place-items-center h-full">
        <label className="text-base font-semibold text-gray-900">Whose this for?</label>
      </div>
      <fieldset className="my-3 sm:ml-0 mx-2">
        <div className="space-y-4 flex items-center space-x-56 space-y-0">
          {activity.map((patientStatus) => (
            <div key={patientStatus.id} className="flex items-center">
              <input
                id={patientStatus.id}
                name="new-patient"
                type="radio"
                defaultChecked={patientStatus.active}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                onClick={e => resetActivity(patientStatus.id)}
              />
              <label htmlFor={patientStatus.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {patientStatus.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {activity[1].active && <NewPatientForm />}
    </div>
  )
}
