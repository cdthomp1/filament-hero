import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Filament Tracker</h1>
      <a href="/api/auth/login">Login</a>
      <FontAwesomeIcon icon={faDumpster} />
    </div>
  )
}
