import CheckoutSteps from './CheckoutSteps';
import Products from './Products';
import CheckoutForm from './CheckoutForm';
import { getLocalStorageItem } from '../../utils'
import { useState, useEffect } from "react";
import PatientInfo from './Steps/PatientInformation/MainForm';
import HealthInformation from './Steps/HealthInformation/HealthInformation';
import PrescriptionInformation from './Steps/PrescriptionInformation/PrescriptionInformation';
import Payment from './Steps/Payment/Payment';
import ShippingAddress from './Steps/ShippingAddress/ShippingAddress';


export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([
    { name: 'Patient Info', stepNumber: 1, href: '#', current: true, component: <PatientInfo /> },
    { name: 'Health Info', stepNumber: 2, href: '#', current: false, component: <HealthInformation /> },
    { name: 'Prescription Information', stepNumber: 3, href: '#', current: false, component: <PrescriptionInformation products={products} setProducts={setProducts}/> },
    { name: 'Shipping Information', stepNumber: 4, href: '#', current: false, component: <ShippingAddress/> },
    { name: 'Payment Information', stepNumber: 5, href: '#', current: false, component: <Payment/> },
  ])

  useEffect(() => {
    let cartItems = getLocalStorageItem("cartItems");
    if (
      cartItems === null ||
      cartItems === undefined ||
      typeof cartItems != typeof []
    )
      cartItems = [];

    setProducts(cartItems);
  }, []);

  return <>
    <CheckoutSteps pages={pages}/>
    <hr />
    <div className="mx-auto grid max-w max-h grid-cols-1 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:divide-x">
      <CheckoutForm pages={pages} setPages={setPages} products={products}/>
      <Products products={products} setProducts={setProducts}/>
    </div>
  </>
}
