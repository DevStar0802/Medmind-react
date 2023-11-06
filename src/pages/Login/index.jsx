import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import ForgottenPasswordPanel from "../../components/ForgetPasswordPanel";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../../utilities/jwt_utilities";

export default function Login() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasForgettenPassword, setHasForgottenPassword] = useState(false);
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  Auth.configure({
    region: "us-east-1",
    userPoolId: "us-east-1_8WhvOPNCY",
    userPoolWebClientId: "1s5g80crh67e55ngbumui3qp33",
  });

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const isValidToken = await isTokenValid();
        if (isValidToken) {
          navigate("/", { replace: true });
        }
      } catch (exception) {
        console.log(exception);
      }
    };

    checkTokenValidity();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const cognitoPayload = await Auth.signIn(
        formData.email,
        formData.password
      );
      document.cookie = `authoization_token=${cognitoPayload.signInUserSession.accessToken.jwtToken}`;
      navigate("/");
    } catch (signInError) {
      alert(signInError.message);
    }
  };

  return (
    <>
      {hasForgettenPassword && isVisible && (
        <div className="fixed inset-0 bg-gray-800 opacity-50 z-20"></div>
      )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
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
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={(e) => {
                      e.preventDefault(); // prevent the default action
                      setHasForgottenPassword(true); // set the state to true
                    }}
                  >
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
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account? <br />
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
      {hasForgettenPassword ? (
        <ForgottenPasswordPanel
          username={formData.email}
          password={formData.password}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          navigate={navigate}
        />
      ) : null}
    </>
  );
}
