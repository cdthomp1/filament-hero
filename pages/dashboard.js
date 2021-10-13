import React from 'react';
import FilamentTable from '../components/filaments/FilamentTable';
import PrintsTable from '../components/prints/PrintsTable';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function dashboard({ user }) {
    return (
        <>
            <div className=" dark:bg-gray-800 h-90v dark:text-white">
                <div className="flex flex-col items-center w-full mt-6">
                    <h1 className="text-5xl m-3">Filaments</h1>
                    <FilamentTable user={user} />
                </div>
                <div className="flex flex-col items-center w-full mt-6">
                    <h1 className="text-5xl m-3">Prints</h1>
                    <PrintsTable user={user} />
                </div>
            </div>
        </>
    )
})