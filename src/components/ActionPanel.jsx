import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function ActionPanel({ username, password, isVisible, setIsVisible, navigate }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      console.log('Code confirmed successfully.');
      setIsConfirmed(true);
      setIsVisible(false); // Close the panel after successful confirmation
      const cognitoPayload = await Auth.signIn(username, password);
      document.cookie = `authoization_token=${cognitoPayload.signInUserSession.accessToken.jwtToken}`;
      navigate("/")
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  
  return (<>
    { isVisible && !isConfirmed && <div className="absolute inset-0 flex items-center justify-center z-50">
      <div className="w-96 h-64 bg-white p-6 rounded shadow-lg">
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-3 right-3 text-white hover:text-gray-800 text-2xl	"
        >
          X
        </button>

        <h3 className="text-base font-semibold leading-6 text-gray-900">Check your email</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Please enter your confirmation code.</p>
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <input
              type="text"
              name="text"
              id="text"
              value={confirmationCode}
              onChange={e => setConfirmationCode(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="xxxxx"
            />
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>}
    </>
  )
}
