import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Filament Hero</title>
        <meta name="description" content="The easy way to keep track of how much filament you have left!"></meta>
        <meta property="og:title" content="Filament Hero" />
        <meta property="og:description" content="The easy way to keep track of how much filament you have left!" />
        <meta property="og:image" content="https://filamenthero.com/filament-hero-image.png" />
        <meta property="og:url" content="https://filamenthero.com" />

        <meta name="twitter:card" content="summary" />
        <meta property="twitter:image" content="https://res.cloudinary.com/cameron-projects/image/upload/v1633038317/Copy_of_Filament_Tracker_whrjf9.png" />
        <meta property="twitter:url" content="https://filamenthero.com" />
        <meta property="twitter:title" content="Filament Hero" />
        <meta name="twitter:site" content="@FilamentHero" />
        <meta name="twitter:creator" content="@developercam" />
      </Head>
      <div className="flex flex-col items-center justify-center h-screen text-center text-white bg-regal-blue">
        <h1 className="2xl:text-6xl xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl text-4xl">Filament Hero</h1>
        <h2 className="2xl:text-5xl xl:text-5xl lg:text-4xl md:text-4xl sm:text-3xl text-3xl">Coming Soon!</h2>
        <p>Follow <a className="text-blue-500" href="https://twitter.com/FilamentHero" target="_blank" rel="noopener noreferrer">@FilamentHero</a> on Twitter for updates!</p>
        <p>Join the Official Discord to be apart of the development process:<br /><a className="text-blue-500" href="https://discord.gg/jKAAhGxyhF" target="_blank" rel="noopener noreferrer">Invite Link</a></p>
      </div>
    </>
  )
}
