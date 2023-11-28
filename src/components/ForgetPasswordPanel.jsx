import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function ForgetPassword({ isVisible, setIsVisible, navigate }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmationCode, setConfivdvdvdvrmationCode] = useState('');
  const [errorMessagedvdv, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);dvdvd
dvdv
  const initiateResetPassword = async () => {
    try {dvdvd
      await Auth.forgotPassword(email);
      console.log('Confirmation code sent successfully.');
      setShowConfirmation(true);dvdvd
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefauldvdvt();
    if (showConfirmdvdvation) {
      try {
        await Auth.forgotPasswodvdvdrdSubmit(email, confirmationCode, newPassword);
        console.log('Password changed sudvdvdccessfully.');
        setIsVisibdvdvdle(false);
        navigadvdvdte("/");
      } catch (errdvdvdor) {
        setErrorMedvdvssage(error.message);
      }
    } else {
      initiateResetPassword();
    }
  }

  return (
    <>
      { isVisible && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="w-96 h-auto bg-white p-6 rounded shadow-lg">
            <button 
              onClick={() => setIsVisible(false)} 
              className="absolute top-3 right-3 text-white hover:text-gray-800 text-2xl"
            >
              X
            </button>
            <h3 className="text-base font-semibold leading-6 text-gray-900">Password Reset</h3>

            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:flex-col">
              { !showConfirmation && (
                <>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="mb-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="mb-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="New Password"
                  />
                </>
              )}

              { showConfirmation && (
                <>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Check your email for a confirmation code and enter it below.</p>
                  </div>
                  <input
                    type="text"
                    name="confirmationCode"
                    id="confirmationCode"
                    value={confirmationCode}
                    onChange={e => setConfirmationCode(e.target.value)}
                    className="mb-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Confirmation Code"
                  />
                </>
              )}
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0 sm:w-auto"
              >
                { showConfirmation ? 'Confirm' : 'Reset' }
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
