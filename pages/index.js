import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-hero-image bg-cover bg-no-repeat bg-center bg-opacity-75 h-96">
      <div className="text-center font-bold ">
        <div className="flex flex-col divide-y-2 divide-regal-blue">
          <h1 className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl text-6xl">Filament Hero</h1>
          <h2 className="2xl:text-4xl xl:text-4xl lg:text-3xl md:text-3xl sm:text-2xl text-4xl">Your 3D Printing<br />Companion</h2>
        </div>
        <div className="flex justify-between w-96">
          <a href="/"><div className="w-40 h-10 bg-gray-300 flex items-center justify-center">Learn More</div></a>
          <a href="/api/auth/login"><div className="w-40 h-10 bg-regal-blue text-white text-center flex items-center justify-center">Get Started</div></a>
        </div>
      </div>
    </div>
  )
}
