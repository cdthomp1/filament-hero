import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Filament Hero</title>
        <meta name="description" content="The easy way to keep track of how much filament you have left!"></meta>
        <meta property="og:title" content="Filament Hero | Home" />
        <meta property="og:description" content="The easy way to keep track of how much filament you have left!" />
        <meta property="og:image" content="./filament-hero-image.png" />
        <meta property="og:url" content="https://filamenthero.com" />

        <meta name="twitter:card" content="The easy way to keep track of how much filament you have left!" />
        <meta property="twitter:image" content="./filament-hero-image.png" />
        <meta property="twitter:url" content="https://filamenthero.com" />
        <meta property="twitter:title" content="Filament Hero | Home" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-regal-blue">
        <h1 className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl text-4xl">Filament Hero</h1>
        <h2 className="2xl:text-5xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl text-3xl">Coming Soon!</h2>
        <p>Follow <a className="text-blue-500" href="https://twitter.com/FilamentHero" target="_blank" rel="noopener noreferrer">@FilamentHero</a> on Twitter for updates!</p>
      </div>
    </>
  )
}
