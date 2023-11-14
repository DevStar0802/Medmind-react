import EditQuantityModal from '../../components/EditQuantityModal'
import { useState, useEffect } from "react";
import { getLocalStorageItem } from '../../utils'

export default function Products({ products, setProducts, cartItemCount, setCartItemCount }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const removeItemFromLocalStorage = (ndc) => {
    const cartItems = getLocalStorageItem('cartItems');
    if (!cartItems || typeof cartItems !== 'object') {
      console.warn('cartItems is not a valid object in localStorage.');
      return;
    }

    const updatedCartItems = cartItems.filter(item => item.ndc !== ndc);
    const updatedCartItemsJSON = JSON.stringify(updatedCartItems);
    localStorage.setItem('cartItems', updatedCartItemsJSON);
  }

  const removeItem = (event, ndc) => {
    event.preventDefault();
    setProducts(products.filter((product) => product.ndc != ndc));
    setCartItemCount(cartItemCount - 1);
    removeItemFromLocalStorage(ndc);
  }

  const saveNewQuantity = (ndc, newQuantity) => {
    const updatedProducts = products.map(product => {
      if (product.ndc === ndc) {
        product.quantity = newQuantity;
      }
      return product;
    });
    setProducts(updatedProducts);
    // Update in local storage too
    localStorage.setItem('cartItems', JSON.stringify(updatedProducts));
  };

  const [subTotal, setSubtotal] = useState(0);
  const [service, setService] = useState(8);
  const [shipping, setShipping] = useState(14);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    let cartItems = getLocalStorageItem('cartItems');

    if (cartItems === null || cartItems === undefined || typeof (cartItems) != typeof ([]))
      cartItems = []

    setProducts(cartItems);
  }, []);

  useEffect(() => {
    setSubtotal(products.reduce((sum, product) => sum + product.price, 0))

  }, [products])

  return <>
    <div className="w-full max-w-lg  lg:col-start-2 mr-18">
      <div className="flow-root">
        <div className=' ml-8 text-3xl'>
          My Cart
        </div>
        <hr className='ml-4' />
        <div className=' ml-8 mb-4 text-lg'>
        CART DETAILS ({products.length} {products.length > 1 ? "items" : "item"})
        </div>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="flex space-x-6 py-6">
              <img
                src={product.image_url}
                className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
              />
              <div className="flex-auto">
                <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                  <div className="flex-auto space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">
                      <a href="/">{product.generic_name} ({product.product_name})</a>
                    </h3>
                    <p className="text-gray-900">${product.price.toFixed(2)}</p>
                    <p className="text-gray-500">{product.quantity} units</p>
                    <p className="hidden text-gray-500 sm:block">{product.size}</p>
                  </div>
                  <div className="flex flex-none space-x-4">
                    <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Edit
                    </button>
                    <div className="flex border-l border-gray-300 pl-4">
                      <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500" onClick={event => removeItem(event, product.ndc)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-10 ml-8 space-y-6 text-sm font-medium text-gray-500">
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
                <dd className="text-base">${(subTotal + service + shipping).toFixed(2)}</dd>
              </div>
            </dl>
      </div>
    </div>
  </>
}