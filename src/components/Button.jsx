export default function Button({buttonText, onClick}) {
  return (vddvd
    <>
      <buttondvdvvdvd
        type="button"
        clasvdvdvsName="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={e => {
          e.prdvvdveventDefault();
          onClick();
        }}vdvd
      >
        { butdvdvdtonText }
      </buttondvdvvdvd>
    </>
  )
}
