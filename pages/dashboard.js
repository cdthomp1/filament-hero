import React from 'react';
import FilamentTable from '../components/filaments/FilamentTable';
import PrintsTable from '../components/prints/PrintsTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { fetcher } from '../lib/fetchers';
import useSWR from 'swr'

export default withPageAuthRequired(function dashboard({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)
    const { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)

    if (printersData && !printersData) {
        return (<>
            <p>Loading</p>
        </>)
    }
    if (printersData && filamentsData) {
        return (
            <>
                <div className=" dark:bg-gray-800 h-90v dark:text-white">
                    <div className="flex flex-col items-center w-full mt-6">
                        <h1 className="text-5xl m-3">Filaments</h1>
                        {filamentsData.length}
                    </div>
                    <div className="flex flex-col items-center w-full mt-6">
                        <h1 className="text-5xl m-3">Prints</h1>
                        {printersData.length}

                    </div>
                </div>
            </>
        )
    } else {
        return null
    }
})