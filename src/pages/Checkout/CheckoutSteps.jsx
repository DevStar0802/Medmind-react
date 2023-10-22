
export default function CheckoutSteps({pages}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 justify-center mt-10">
      {pages.map((page, index) => (
        <div key={page.name} className={`flex items-center ${index !== 0 ? 'sm:ml-2' : ''}`}>
          {/* If not the first item, show the separator */}
          {index !== 0 && (
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-300 hidden sm:block"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          )}
          
          <a
            href={page.href}
            className={`${
              page.current ? 'text-blue-500' : 'text-gray-500'
            } text-base sm:text-xl font-medium hover:text-gray-700 px-2 py-1 rounded-md`}
            aria-current={page.current ? 'page' : undefined}
          >
            {page.stepNumber}. {page.name}
          </a>
        </div>
      ))}
    </div>
  )
}
