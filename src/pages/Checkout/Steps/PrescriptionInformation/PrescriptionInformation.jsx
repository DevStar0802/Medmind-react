import React from 'react';
import { useEffect } from "react";
import { getLocalStorageItem } from '../../../../utils';
import { useState } from 'react';

export default function PrescriptionInformation() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cartItems = getLocalStorageItem('cartItems');

    if (cartItems === null || cartItems === undefined || typeof (cartItems) != typeof ([]))
      cartItems = []

    setProducts(cartItems);
  }, []);

  return (
    <div className="mb-3 mb:mb-0 pb-3 pb:pb-4 col-span-12 mx-2">
      <div>
        {products.map((product, index) => (
          <div key={product.id} className="mb-4 border-b border-dashed border-gray-400 pb-6">
            <div>
              <div className="mb-1 text-sm font-medium">
                {product.generic_name} ({product.product_name})
                <span className="ml-1 text-utility-semi-dark">{product.manufacturer}</span>
              </div>
              <p className="text-sm text-utility-semi-dark truncate" role="document" aria-label="Product options">
                <span>{product.form}</span>
                <span className="mx-1">•</span>
                <span>{product.strength}</span>
                <span className="mx-1">•</span>
                <span>{product.quantity} ct</span>
              </p>
            </div>
            <div className="mt-3 mb-2 text-sm font-medium">How would you like us to get your prescriptions?</div>
            <div className="flex flex-wrap">
              <div className="col-span-12">
                <label className="flex items-center mb-2 label-button">
                  <input type="radio" name={`prescription-method-${product.ndc}`} value="1" className="mr-3" />
                  <p className='text-sm mt-3'>My doctor will send in my Rx electronically or via fax</p>
                </label>
                <label className="flex items-center mb-2 label-button">
                  <input type="radio" name={`prescription-method-${product.ndc}`} value="1" className="mr-3" />
                  <p className='text-sm mt-3'>Transfer from my old pharmacy</p>
                </label>
                <label className="flex items-center mb-2 label-button">
                  <input type="radio" name={`prescription-method-${product.ndc}`} value="1" className="mr-3" />
                  <p className='text-sm mt-3'>I am already a Medmind patient and you have my Rx on file</p>
                </label>
              </div>
            </div>
            {/* ... Other radio options */}
          </div>
        ))}
      </div>
    </div>
  );
}
