export default function ShippingAddress() {
  return (
    <div className="mx-4">
      <h3 id="shipping-heading" className="text-lg font-medium text-gray-900">
        Shipping address
      </h3>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="address"
              name="address"
              autoComplete="street-address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="city"
              name="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
            State / Province
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="region"
              name="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
            Postal code
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              autoComplete="postal-code"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}