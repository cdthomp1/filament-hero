import Link from 'next/link'
import React from 'react'
import filaments from '../../pages/filaments'

const Card = ({ filament }) => {
    console.log(filament._id)
    return (
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={filament?.image} alt="" />

            <div className="p-5">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{filament.brand} {filament.color} {filament.type}</h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Weight: {filament.weight}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Nozzle Temp: {filament.printingNozelTemp}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Bed Temp: {filament.printingBedTemp}</p>
                {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Notes: {filament.generalNotes}</p> */}
                <a href={'filament/' + filament?._id} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Details
                    <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
        </div>
    )
}

export default Card



