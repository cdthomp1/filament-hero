import React, { Fragment, useState } from 'react'
import useSWR, { mutate } from 'swr'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { fetcher, dirtyFetcher } from '../../lib/fetchers'
import { notifySuccess, notifyError } from '../../lib/toasts';

const PrinterTable = ({ user, filamentsData }) => {
    var { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)

    const [editPrinterId, setEditPrinterId] = useState(null);

    const [editPrinterData, setEditFormData] = useState({
        name: "",
        make: "",
        model: "",
        bedWidth: 0,
        bedLength: 0,
        buildHeight: 0,
        currentFilament: "",
        status: "",
        // image: "",
        notes: "",
        userId: ""
    });

    const handleEditClick = (event, printer) => {
        event.preventDefault();
        setEditPrinterId(printer._id);

        const formValues = {
            name: printer.name,
            make: printer.make,
            model: printer.model,
            bedWidth: printer.bedWidth,
            bedLength: printer.bedLength,
            buildHeight: printer.buildHeight,
            description: printer.description,
            currentFilament: printer.currentFilament._id,
            status: printer.status,
            // image: printer.image,
            notes: printer.notes,
            userId: user.sub
        };

        setEditFormData(formValues);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editPrinterData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async () => {
        const res = await dirtyFetcher("/api/printer/editPrinter?id=" + editPrinterId, {
            method: "put",
            body: JSON.stringify(editPrinterData)
        });


        if (res.status === 200) {
            notifySuccess(`${editPrinterData.name} is updated! 🎉`)
        }

        mutate(`/api/printer/getPrinters?userId=${user.sub}`);
        setEditPrinterId(null);

    };

    const handleDeleteClick = async (printerId) => {
        const res = await dirtyFetcher("/api/printer/deletePrinter", {
            method: "delete",
            body: JSON.stringify({ id: printerId })
        });

        if (res.status === 200) {
            notifySuccess(`Printer deleted! 🎉`)
        }

        mutate(`/api/printer/getPrinters?userId=${user.sub}`);
    };

    const handleCancelClick = () => {
        setEditPrinterId(null);
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
        <>
            <div className="w-11/12 m-auto overflow-x-auto">
                <table className="table-fixed">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center ">Name</th>
                            <th className="py-3 px-6 text-center ">Make</th>
                            <th className="py-3 px-6 text-center ">Model</th>
                            <th className="py-3 px-6 text-center ">Bed Width</th>
                            <th className="py-3 px-6 text-center ">Bed Legnth</th>
                            <th className="py-3 px-6 text-center ">Build Height</th>
                            <th className="py-3 px-6 text-center ">Current Filament</th>
                            <th className="py-3 px-6 text-center ">Status</th>
                            {/* <th className="py-3 px-6 text-center">Picture</th> */}
                            <th className="py-3 px-6 text-center ">Current Print</th>
                            <th className="py-3 px-6 text-center w-1/2">Notes</th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {printersData.map((printer, index) => {
                            return (<Fragment key={index}> {editPrinterId !== printer._id ? (
                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center">
                                            {printer.name}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center max-w-min">
                                        <div className="flex items-center justify-center">
                                            <div className="mr-2">
                                                {printer.make}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center max-w-min">
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
                                            {printer.currentFilament === null ? <></> : <a href="#" className="text-purple-600">{`${printer.currentFilament.brand} ${printer.currentFilament.type} ${printer.currentFilament.color}`}</a>}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {printer.status === 'Printing' ? (<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{printer.status}</span>) : printer.status === 'Active' ? (<span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{printer.status}</span>) : printer.status === 'Down' ? (<span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{printer.status}</span>) : (<span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">{printer.status}</span>)}

                                    </td>
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
                                </tr>) : (
                                <Fragment key={index}><tr className="border-b border-gray-200 hover:bg-gray-100">
                                    <td class="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="name" className="border w-28" value={editPrinterData.name} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="make" className="border w-28" value={editPrinterData.make} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="model" className="border w-28" value={editPrinterData.model} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="bedWidth" className="border w-28" value={editPrinterData.bedWidth} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="bedLength" className="border w-28" value={editPrinterData.bedLength} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input type="text" name="buildHeight" className="border w-28" value={editPrinterData.buildHeight} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <select type="text" name="currentFilament" className="border" onChange={handleEditFormChange} >
                                            <option value="">Filament</option>
                                            {filamentsData.map((filament, index) => {
                                                return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                                            })}
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <select type="text" name="status" className="border" value={editPrinterData.status} onChange={handleEditFormChange}>
                                            <option value="">Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Printing">Printing</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Down">Down</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input name="currentPrint" disabled="true" type="text" className="border w-28 cursor-not-allowed" title="You can add a print in the prints tab!" onChange={handleEditFormChange} />

                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <input name="notes" type="text" className="border w-28" value={editPrinterData.notes} onChange={handleEditFormChange} />
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        <button
                                            onClick={handleEditFormSubmit}
                                        ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                        <button type="button" onClick={handleCancelClick}>
                                            <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                        </button>
                                    </td>
                                </tr> </Fragment>)}
                            </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PrinterTable
