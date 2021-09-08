import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-96 py-2 bg-hero-image bg-cover bg-no-repeat bg-center bg-opacity-75">
      <div className="text-center font-bold">
        <h1 className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl text-6xl">Filament<br />Hero</h1>
        <hr />
        <h2 className="2xl:text-5xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl text-5xl">Your 3D Printing<br />Companion</h2>
        <div className="flex justify-between w-96">
          <a href="/"  ><div className="w-52 bg-red-400">Learn More</div></a>
          <div className="w-52 bg-red-400"><a href="/api/auth/login">Get Started</a></div>
        </div>
      </div>
    </div>
  )
}
