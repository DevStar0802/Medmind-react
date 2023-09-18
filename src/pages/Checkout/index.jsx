import NavigationBar from '../../components/NavigationBar'
import { useState } from 'react';

export default function Checkout() {
  const [cartItemCount, setCartItemCount] = useState(0);

  return <>
    <NavigationBar cartItemCount={cartItemCount} setCartItemCount={setCartItemCount}/>
  </>
}