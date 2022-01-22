
export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center h-90v justify-center  bg-hero-image bg-cover bg-no-repeat bg-center bg-opacity-75">
        <div className="text-center font-bold flex flex-col self-center content-evenly">
          <h1 className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl text-6xl mb-3">Filament<br />Hero</h1>
          <hr className="border-0 bg-black text-gray-500 h-0.5" />
          <h2 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl text-5xl mb-3 mt-3">Your 3D Printing<br />Companion</h2>
          <div className="flex justify-between w-96 mt-6">
            <a href="#learnMore"  ><div className="text-lg font-medium bg-gray-500 text-white px-8 py-2 rounded-lg shadow hover:bg-purple-700 transition-color duration-100 ease-in-out active:shadow-outline focus:shadow-outline">Learn More</div></a>
            <div className="text-lg font-medium bg-regal-blue text-white px-8 py-2 rounded-lg shadow hover:bg-purple-700 transition-color duration-100 ease-in-out active:shadow-outline focus:shadow-outline"><a href="/api/auth/login">Get Started</a></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center" id="learnMore">
        <h2 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl text-5xl mb-3 mt-3">Add Your Filaments</h2>
        <div>
          <p>Add your filaments with the form. Keep track of them on the handy table. Make a mistake? Edit the filament directly in the table!</p>
        </div>
        <h2 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl text-5xl mb-3 mt-3">Add Your Printers</h2>
        <div>
          <p>Add your printers with the form. Keep track of which printer is loaded with which filament</p>
        </div>
        <h2 className="2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl text-5xl mb-3 mt-3">Add Your Prints</h2>
        <div>
          <p>Add your prints with the form. When you add a print, the weight of will be deducted from the associated filament. The printer status will also be updated appropietly.</p>
        </div>
      </div>
    </>
  )
}
