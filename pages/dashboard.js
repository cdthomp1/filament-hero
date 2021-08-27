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


    const { data: prints, error: printsError } = useSWR(`/api/print/getPrints`, fetcher)


    if (printsError) return <div>{printsError.message}</div>
    if (!prints) return <div>Loading...</div>



    return (
        <>
            <div>
                <FilamentTable user={user} />
            </div>

            <div>
                <PrintsTable user={user} />
            </div>
        </>
    )
})