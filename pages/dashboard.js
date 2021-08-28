import React, { useState } from 'react';
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit } from '@fortawesome/free-solid-svg-icons'
import FilamentTable from '../components/FilamentTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PrintsTable from '../components/PrintsTable';

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}


export default withPageAuthRequired(function dashboard({ user }) {


    const { data: filaments, error: filamentsError } = useSWR(`/api/filament/getFilaments?id=${user.sub}`, fetcher)


    if (filamentsError) return <div>{filamentsError.message}</div>
    if (!filaments) return <div>Loading...</div>

    return (
        <>
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-5xl m-3">Filaments</h1>
                <FilamentTable user={user} />
            </div>
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-5xl m-3">Prints</h1>

                <PrintsTable user={user} />

            </div>
        </>
    )
})