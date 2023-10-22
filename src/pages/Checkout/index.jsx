import NavigationBar from '../../components/NavigationBar'
import CheckoutSteps from './CheckoutSteps';
import Products from './Products';
import CheckoutForm from './CheckoutForm';
import { useState, useEffect } from "react";
import { getLocalStorageItem } from '../../utils'
import { RiShoppingCartLine } from 'react-icons/ri';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([
    { name: 'Patient Info', stepNumber: 1, href: '#', current: true },
    { name: 'Health Info', stepNumber: 2, href: '#', current: false },
    { name: 'Prescription Info', stepNumber: 3, href: '#', current: false },
    { name: 'Shipping', stepNumber: 4, href: '#', current: false },
    { name: 'Payment', stepNumber: 5, href: '#', current: false },
  ])

  useEffect(() => {
    let cartItems = getLocalStorageItem('cartItems');

    if (cartItems === null || cartItems === undefined || typeof (cartItems) != typeof ([]))
      cartItems = []

    setProducts(cartItems);
  }, []);

  return <>
    <CheckoutSteps pages={pages}/>
    <hr />
    <div className="mx-auto grid max-w max-h grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:divide-x">
      <CheckoutForm pages={pages} setPages={setPages} />
      <Products products={products} setProducts={setProducts} setCartItemCount={setCartItemCount} cartItemCount={cartItemCount}/>
    </div>
  </>
}