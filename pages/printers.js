import React from 'react'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PrinterTable from '../components/printers/PrinterTable';
import useSWR from 'swr'

const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default withPageAuthRequired(function printers({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    if (filamentsData && !filamentsData.length > 0) {
        return (<>
            <div className="flex flex-col items-center">
                <h3 className="text-2xl text-center p-6">&#x1F6A8; You need to add a Filament before you can add a Printer! &#x1F6A8;</h3>
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
                    <h1 className="text-4xl text-center p-6">Printers</h1>
                    <PrinterTable user={user} filamentsData={filamentsData} />
                    <div className="m-6">
                        <Link href="/addPrinter"><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300">Add a Printer!</button></Link>
                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
})