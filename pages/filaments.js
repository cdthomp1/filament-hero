import React from 'react'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import FilamentTable from '../components/filaments/FilamentTable'
import useSWR from 'swr'
import { fetcher } from '../lib/fetchers';

export default withPageAuthRequired(function filaments({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

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
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center p-6">Filaments</h1>
                    <FilamentTable user={user} filamentsData={filamentsData} />
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
