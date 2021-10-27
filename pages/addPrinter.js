import React from 'react'
import PrinterForm from '../components/printers/PrinterForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr'


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

    console.log(filamentsData)

    return (
        <>
            <h1 className="text-6xl text-center p-6">Add a Printer</h1>
            <PrinterForm user={user} filamentsData={filamentsData}/>
        </>
    )
})