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
    const { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)
    const { data: printsData, error: printsError } = useSWR(`/api/print/getPrints?userId=${user.sub}`, fetcher)

    let warningMessage = '';
    let errorLink = ''
    let linkText = ''

    if ((printersData && !printersData.length > 0)) {
        warningMessage = 'You need to add a Pritner before you can add a print!'
        errorLink = '/addPrinter'
        linkText = "Add a Printer!"
    }

    if ((printsData && !printsData.length > 0)) {
        warningMessage = 'You have 0 Prints added, add one below!'
        linkText = "Add a Print!"
        errorLink = '/addPrint'
    }

    if ((filamentsData && !filamentsData.length > 0)) {
        warningMessage = 'You need to add a Filament before you can add a Print'
        linkText = "Add a Filament!"
        errorLink = '/addFilament'

    }


    if (filamentsError || printersError || printersError) {
        return (<>
            <div className="flex flex-col items-center">
                <h3 className="text-2xl text-center p-6">&#x1F6A8; There was an error on the server, please try again &#x1F6A8;</h3>

            </div>
        </>)
    }

    if (warningMessage) {
        return (<>
            <div className="flex flex-col items-center h-max mb-auto">
                <h3 className="text-2xl text-center p-6">&#x1F6A8; {warningMessage} &#x1F6A8;</h3>
                <div className="m-6">
                    <Link href={errorLink}><button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300">{linkText}</button></Link>
                </div>
            </div>
        </>)
    }

    console.log(printersData && filamentsData && warningMessage === '')

    if (printersData && filamentsData && warningMessage === '') {
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
    } else {
        return null
    }
})
