import React, { useState } from 'react';
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit } from '@fortawesome/free-solid-svg-icons'
import FilamentTable from '../components/FilamentTable';

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}


const dashboard = () => {


    const { data: prints, error: printsError } = useSWR(`/api/print/getPrints`, fetcher)

   
    if (printsError) return <div>{printsError.message}</div>
    if (!prints) return <div>Loading...</div>



    return (
        <>
            <div>
                <FilamentTable />
            </div>

            <div>
                Prints
                <table className="border-collapse border border-green-500">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Filament</th>
                            <th>Duration</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prints.map((print, index) => {
                            return (
                                <tr key={index}>
                                    <td>{print.name}</td>
                                    <td>{print.description}</td>
                                    <td>{print.filament}</td>
                                    <td>{print.duration}</td>
                                    <td>{print.weight}</td>
                                    <td><FontAwesomeIcon className="m-1" icon={faEdit} /><FontAwesomeIcon className="m-1" icon={faDumpster} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default dashboard
