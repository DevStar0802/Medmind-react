const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]

export default function Payment() {

  return (
    <div className="">
      <h2 className="text-lg font-medium text-gray-900">Payment</h2>

      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              {paymentMethodIdx === 0 ? (
                <input
                  id={paymentMethod.id}
                  name="payment-type"
                  type="radio"
                  defaultChecked
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              ) : (
                <input
                  id={paymentMethod.id}
                  name="payment-type"
                  type="radio"
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              )}

              <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
        <div className="col-span-4">
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
            Card number
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="card-number"
              name="card-number"
              autoComplete="cc-number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1"
            />
          </div>
        </div>

        <div className="col-span-4">
          <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
            Name on card
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="name-on-card"
              name="name-on-card"
              autoComplete="cc-name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
            Expiration date (MM/YY)
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="expiration-date"
              id="expiration-date"
              autoComplete="cc-exp"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}