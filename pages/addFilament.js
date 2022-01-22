import React from 'react'
import Link from 'next/link'
import FilamentForm from '../components/filaments/FilamentForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function addPrint({ user }) {
    return (
        <>
            <div className="md:grid grid-flow-col grid-cols-3 gap-4">
                <h1 className="text-4xl text-center p-6 col-start-2">Add a Filament</h1>
            </div>
            <FilamentForm user={user} />
        </>
    )
})