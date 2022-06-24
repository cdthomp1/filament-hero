import React, { useState } from 'react'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import FilamentTable from '../components/filaments/FilamentTable'
import useSWR from 'swr'
import { fetcher } from '../lib/fetchers';
import FilamentGrid from '../components/filaments/FilamentGrid';

export default withPageAuthRequired(function filaments({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    let [display, setDisplay] = useState(false)

    function handleToggle() {
        display = !display;
        setDisplay(display)
    }

    if (filamentsData && !filamentsData.length > 0) {
        return (<>
            <div className="flex flex-col items-center">
                <h3 className="text-2xl text-center p-6">&#x1F6A8; You have 0 Filaments added, add one below! &#x1F6A8;</h3>
                <div className="m-6">
                    <Link href="/addFilament"><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300">Add a Filament!</button></Link>
                </div>
            </div>
        </>)
    }

    if (filamentsData) {
        return (
            <>
                <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" value={display} id="default-toggle" className="sr-only peer" onClick={handleToggle} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                </label>
                <h1 className="text-4xl text-center p-6">Filaments</h1>
                {display &&
                    <div className='grid grid-cols-4 gap-4'>
                        <FilamentGrid user={user} filamentsData={filamentsData} />
                    </div>
                }
                {!display &&
                    <FilamentTable user={user} filamentsData={filamentsData} />
                }
                <div className="flex flex-col items-center">
                    <div className="m-6">
                        <Link href="/addFilament"><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300">Add a Filament!</button></Link>
                    </div>
                </div>
            </>
        )
    }
    else {
        return null
    }
})
