import React from 'react'
import Link from 'next/link'
import PrintForm from '../components/prints/PrintForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { fetcher } from '../lib/fetchers';

export default withPageAuthRequired(function addPrint({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)
    var { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)

    return (
        <>
            <div className="md:grid grid-flow-col grid-cols-3 gap-4">
                <h1 className="text-4xl text-center p-6 col-start-2">Add a Print</h1>
            </div>
            <PrintForm user={user} filamentsData={filamentsData} printersData={printersData} />
        </>
    )
})