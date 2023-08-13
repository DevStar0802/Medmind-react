/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import ActionPanel from '../../components/ActionPanel'
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

export default function SignUp() {
    const [signedUp, setSignedUp] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Add this state
    const navigate = useNavigate(); // Get the navigate function from the hook

    Auth.configure({
        region: 'us-east-1',
        userPoolId: 'us-east-1_8WhvOPNCY',
        userPoolWebClientId: '1s5g80crh67e55ngbumui3qp33',
    });

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await Auth.signUp({
                username: formData.email,
                password: formData.password,
                attributes: {
                    email: formData.email
                }
            });
            setSignedUp(true);
            console.log(user);
        } catch (error) {
            if (error.code == "UsernameExistsException") {
                // Try to resend the signup code to check if user is confirmed or not
                try {
                    await Auth.resendSignUp(formData.email);
                    console.log('User is already confirmed.');
                    // Handle logic for confirmed users
                    setSignedUp(true);
                } catch (resendError) {
                    if (resendError.code === 'UserNotFoundException') {
                        console.log('User exists but is not confirmed.');
                        // Handle logic for unconfirmed users
                        setSignedUp(false); // or other logic to handle unconfirmed users
                    } else {
                        alert(resendError.message);
                        setError(resendError.message);
                    }
                }
                return;
            }
            alert(error.message);
            setError(error.message);
        }
    };

    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            {signedUp && isVisible && <div className="fixed inset-0 bg-gray-800 opacity-50 z-20"></div>}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?  <br />
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </a>

                    </p>
                </div>
            </div>
            {signedUp ? <ActionPanel username={formData.email} setIsVisible={setIsVisible} isVisible={isVisible} navigate={navigate} /> : null}
        </>
    )
}
