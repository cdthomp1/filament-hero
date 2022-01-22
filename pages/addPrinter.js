import React from 'react'
import Link from 'next/link'
import PrinterForm from '../components/printers/PrinterForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { fetcher } from '../lib/fetchers';

export default withPageAuthRequired(function addPrint({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    return (
        <>
            <div className="md:grid grid-flow-col grid-cols-3 gap-4">
                <h1 className="text-4xl text-center p-6 col-start-2">Add a Printer</h1>
            </div>
            <PrinterForm user={user} filamentsData={filamentsData} />
        </>
    )
})