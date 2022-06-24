import React from 'react'
import FilamentDetails from '../../components/filaments/FilamentDetails'
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr'
import { fetcher } from '../../lib/fetchers';


export default withPageAuthRequired(function Filament({ user }) {
    const router = useRouter()
    const { id } = router.query

    const { data: filamentData, error: filamentsError } = useSWR(`/api/filament/getFilament?userId=${user.sub}&filamentId=${id}`, fetcher)
    console.log(filamentData)
    if (!filamentData) {
        return (
            <p>Loading</p>
        )
    }
    if (filamentData) {
        return (
            <>
                <FilamentDetails filament={filamentData} />
            </>
        )
    }
    if (filamentsError) {
        return (
            <p>ERROR!</p>
        )
    }
})
