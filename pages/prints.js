import React from 'react'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PrintsTable from '../components/prints/PrintsTable'

import useSWR from 'swr'


const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default withPageAuthRequired(function print({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)
    var { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)
    return (
        <>
                        <div className="flex flex-col items-center">

                <h1 className="text-4xl text-center p-6">Prints</h1>

                <PrintsTable user={user} filamentsData={filamentsData} printersData={printersData} />
                <div className="m-6">
                    <Link href="/addPrint"><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300">Add a Print!</button></Link>

                </div>
            </div>
        </>

    )
})
