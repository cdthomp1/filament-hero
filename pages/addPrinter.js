import React from 'react'
import Link from 'next/link'
import PrinterForm from '../components/printers/PrinterForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default withPageAuthRequired(function addPrint({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)


    return (
        <>
            <div className="md:grid grid-flow-col grid-cols-3 gap-4">
{/*                 <div className="sm:py-6 sm:px-6 sm:inline-block xs:hidden">
                    <Link href="/printers"><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-3 focus:border-purple-300"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faArrowAltCircleLeft} /> Back to Printers</button></Link>
                </div> */}
                <h1 className="text-4xl text-center p-6 col-start-2">Add a Printer</h1>
            </div>
            <PrinterForm user={user} filamentsData={filamentsData} />
        </>
    )
})