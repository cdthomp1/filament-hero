import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import PrinterForm from './PrinterForm'


const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const PrinterTable = ({ user }) => {
    var { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)

    const [editPrinterId, SetEditPrinterId] = useState(null);


    // this is to see the skeleton table 
    //printersData=false


    const handleDeleteClick = async (printerId) => {
        const res = await fetcher("/api/printer/deletePrinter", {
            method: "delete",
            body: JSON.stringify({ id: printerId })
        });

        mutate(`/api/printer/getPrinters?userId=${user.sub}`);

    };

    if (printersError) return <div>{printersError.message}</div>
    if (!printersData) return (
        <table className="animate-pulse min-w-max w-full table-auto ">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                    <th className="py-3 px-6 text-center">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                    <td className="py-3 px-6">&nbsp;</td>
                </tr>

            </tbody>
        </table>
    )
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-max w-full table-auto ">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Make</th>
                            <th className="py-3 px-6 text-center">Model</th>
                            <th className="py-3 px-6 text-center">Bed Width</th>
                            <th className="py-3 px-6 text-center">Bed Legnth</th>
                            <th className="py-3 px-6 text-center">Build Height</th>
                            <th className="py-3 px-6 text-center">Current Filament</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            {/* <th className="py-3 px-6 text-center">Picture</th> */}
                            <th className="py-3 px-6 text-center">Current Print</th>
                            <th className="py-3 px-6 text-center">Notes</th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {printersData.map((printer, index) => {
                            return (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center">
                                            {printer.name}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="mr-2">
                                                {printer.make}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            {printer.model}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                            {printer.bedWidth}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            {printer.bedLength}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            {printer.buildHeight}
                                        </div>
                                    </td>

                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <a href="#" className="text-purple-600">{`${printer.currentFilament.type} ${printer.currentFilament.color}`}</a>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{printer.status}</span>
                                    </td>
                                    {/* <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <img className="w-14 h-14  border-gray-200 border transform hover:scale-125" src="https://res.cloudinary.com/cameron-projects/image/upload/v1635223812/IMG_6911_xekcs5.png" />
                                </div>
                            </td> */}
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <a href="#" className="text-purple-600">{printer.currentPrint}</a>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            {printer.notes}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, printer)}
                                                icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(printer._id)} icon={faDumpster} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PrinterTable
