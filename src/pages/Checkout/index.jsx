import { useState, useEffect, useContext } from "react";
import { getLocalStorageItem } from "../../utils";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { MyContext } from "../../utilities/MyContext";

import { isTokenValid } from "../../utilities/jwt_utilities";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utilities/Notification";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [service, setService] = useState(8);
  const [shipping, setShipping] = useState(14);
  const { cartItemCount, setCartItemCount } = useContext(MyContext);

  useEffect(() => {
    let cartItems = getLocalStorageItem("cartItems");
    console.log("#@#", cartItems);
    if (
      cartItems === null ||
      cartItems === undefined ||
      typeof cartItems != typeof []
    )
      cartItems = [];

    setProducts(cartItems);
  }, []);

  useEffect(() => {
    setSubtotal(
      products.reduce((sum, product) => sum + Number(product.price), 0)
    );
  }, [products]);

  //Check user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const isValidToken = await isTokenValid();
        if (!isValidToken) {
          notify("warning", "You are not signed in!");
          navigate(-1);
        }
      } catch (exception) {
        console.log("Error", exception);
        navigate(-1);
        notify("error", exception);
      }
    };

    checkTokenValidity();
  }, []);

  const removeItemFromLocalStorage = (ndc) => {
    const cartItems = getLocalStorageItem("cartItems");
    if (!cartItems || typeof cartItems !== "object") {
      console.warn("cartItems is not a valid object in localStorage.");
      return;
    }

    const updatedCartItems = cartItems.filter((item) => item.ndc !== ndc);
    const updatedCartItemsJSON = JSON.stringify(updatedCartItems);
    localStorage.setItem("cartItems", updatedCartItemsJSON);
  };

  const removeItem = (event, ndc) => {
    event.preventDefault();
    setProducts(products.filter((product) => product.ndc !== ndc));
    setCartItemCount(cartItemCount - 1);
    removeItemFromLocalStorage(ndc);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14">
        <h1 className="sr-only">Checkout</h1>
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="mx-auto w-full max-w-lg">
            <h2 className="sr-only">Order summary</h2>
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {products.length ? (
                  products.map((product) => (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <img
                        src={product.image_url}
                        className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
                        alt="drug label"
                      />
                      <div className="flex-auto">
                        <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                          <div className="flex-auto space-y-1 text-sm font-medium">
                            <h3 className="text-gray-900">
                              <a href="/">
                                {product.generic_name} ({product.product_name})
                              </a>
                            </h3>
                            <p className="text-gray-900">
                              ${Number(product.price).toFixed(2)}
                            </p>
                            <p className="text-gray-500">
                              {product.quantity} units
                            </p>
                            <p className="hidden text-gray-500 sm:block">
                              {product.size}
                            </p>
                          </div>
                          <div className="flex flex-none space-x-4">
                            <button
                              type="button"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Edit
                            </button>
                            <div className="flex border-l border-gray-300 pl-4">
                              <button
                                type="button"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={(event) =>
                                  removeItem(event, product.ndc)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="md:py-48 pt-28">
                    <div>
                      <h2 className="text-center">
                        You have no items in your shopping cart
                      </h2>
                      <a
                        href="/"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "30px",
                        }}
                        className="ml-32 md:ml-36"
                      >
                        <BsFillArrowLeftSquareFill
                          size="26px"
                          style={{ marginRight: "10px" }}
                        />
                        Go back to home
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg">
            {!subTotal && (
              <>
                <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900">${subTotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Service Fee</dt>
                    <dd className="text-gray-900">${service.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-gray-900">${shipping.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                    <dt className="text-base">Total</dt>
                    <dd className="text-base">
                      ${(subTotal + service + shipping).toFixed(2)}
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                >
                  Proceed to checkout &nbsp;
                  <RiShoppingCartLine color="white" size="24px" />
                </button>
              </>
            )}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-10">
              <div className="font-bold text-lg mb-4">
                HOW TO BUY FROM MEDMIND
              </div>
              <div className="text-base font-sans">
                <div className="mb-4">
                  <span className="font-semibold text-lg">Step 1:</span>
                  <p className="text-gray-700">
                    Find your meds and place your order online.
                  </p>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">Step 2:</span>
                  <p className="text-gray-700">
                    Have your doctor send your prescription electronically to us
                    in Culver City, CA or by fax at (424) 543-0481. We can also
                    accept transfers from your old pharmacy.
                  </p>
                </div>
                <div className="mb-4">
                  <span className="font-semibold text-lg">Step 3:</span>
                  <p className="text-gray-700">
                    Your meds are shipped once we receive your prescription.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
