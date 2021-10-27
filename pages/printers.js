import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PrinterTable from '../components/printers/PrinterTable';
import PrinterForm from '../components/printers/PrinterForm';


export default withPageAuthRequired(function printers({ user }) {
    return (
        <>
            <h1 className="text-6xl text-center p-6">Printers</h1>
            <PrinterTable user={user} />
        </>
    )
})