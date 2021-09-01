import React from 'react';
import FilamentTable from '../components/FilamentTable';
import PrintsTable from '../components/PrintsTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default/*  withPageAuthRequired( */function dashboard(/* { user } */) {
    return (
        <>
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-5xl m-3">Filaments</h1>
                <FilamentTable /* user={user} */ />
            </div>
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-5xl m-3">Prints</h1>

                {/* <PrintsTable user={user} /> */}

            </div>
        </>
    )
}/* ) */