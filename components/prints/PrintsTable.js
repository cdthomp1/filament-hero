import React, { Fragment, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { fetcher, dirtyFetcher } from '../../lib/fetchers'
import { notifySuccess, notifyError } from '../../lib/toasts';

export default function PrintsTable({ user }) {
    const { data: printsData, error: printsError } = useSWR(`/api/print/getPrints?userId=${user.sub}`, fetcher)
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)
    const { data: printersData, error: printersError } = useSWR(`/api/printer/getPrinters?userId=${user.sub}`, fetcher)
    if (printersData) {
        console.log(printsData)
    }
    const [editPrintData, setEditFormData] = useState({
        name: "",
        printer: "",
        stlUrl: "",
        estPrintTime: "",
        actPrintTime: "",
        filamentId: "",
        notes: "",
        status: "",
        partId: "",
        settingsId: "",
        nozelSize: "",
        filamentLength: 0,
        weight: 0,
        date: "",
        userId: ""
    });

    const [editPrintId, SetEditPrintId] = useState(null);

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editPrintData };
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async () => {
        const res = await dirtyFetcher("/api/print/updatePrint?id=" + editPrintId, {
            method: "put",
            body: JSON.stringify(editPrintData)
        });

        if (res.status === 200) {
            notifySuccess(`${editPrintData.name} is updated! 🎉`)
        } else if (res.status === 404) {
            notifyError(`Print could not be found 😩`)
        } else if (res.status === 500) {
            notifyError('There is something wrong on our end 🤦🏼‍♂️ try again soon ')
        }

        mutate(`/api/print/getPrints?userId=${user.sub}`);
        SetEditPrintId(null);
    };

    const handleEditClick = (event, print) => {
        event.preventDefault();
        SetEditPrintId(print._id);

        const formValues = {
            name: print.name,
            printer: print.printer,
            stlUrl: print.stlUrl,
            estPrintTime: print.estPrintTime,
            actPrintTime: print.actPrintTime,
            filamentId: print.filamentId,
            notes: print.notes,
            status: print.status,
            partId: print.partId,
            settingsId: print.settingsId,
            nozelSize: print.nozelSize,
            filamentLength: print.filamentLength,
            weight: print.weight,
            date: print.date,
            userId: user.sub
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        SetEditPrintId(null);
    };

    const handleDeleteClick = async (printId) => {
        const res = await dirtyFetcher("/api/print/deletePrint", {
            method: "delete",
            body: JSON.stringify({ id: printId })
        });

        if (res.status === 200) {
            notifySuccess(`Print deleted! 🎉`)
        } else if (res.status === 404) {
            notifyError(`Print could not be found 😩`)
        } else if (res.status === 500) {
            notifyError('There is something wrong on our end 🤦🏼‍♂️ try again soon ')
        }

        mutate(`/api/print/getPrints?userId=${user.sub}`);
    };

    if (printsError || filamentsError || printersError) return <div>{printsError.message || filamentsError.message}</div>
    if (!printsData || !filamentsData || !printersData) return (
        <table className="animate-pulse shadow-lg border-collapse border w-9/12 table-fixed mb-4">
            <thead>
                <tr>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                    <th className="bg-gray-500 border text-xl">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr className="h-4 even:bg-gray-100 ">
                    <td className="h-4">&nbsp;</td>
                    <td className="h-4">&nbsp;</td>
                    <td className="h-4">&nbsp;</td>
                    <td className="h-4">&nbsp;</td>
                    <td className="h-4">&nbsp;</td>
                    <td className="h-4">&nbsp;</td>
                </tr>
                <tr className="h-4 even:bg-gray-100 ">
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                </tr>
                <tr className="h-4 even:bg-gray-100 ">
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                    <td className="h-4 ">&nbsp;</td>
                </tr>

            </tbody>
        </table>
    )

    if (printsData || filamentsData || printersData) return (
        <>
            <div className="w-11/12 m-auto overflow-x-auto">
                <table className="table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Printer</th>
                            <th className="py-3 px-6 text-center">EST. Print<br />Time</th>
                            <th className="py-3 px-6 text-center">ACT. Print Time</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Filament</th>
                            {/* <th className="py-3 px-6 text-center">Settings</th> */}
                            {/* <th className="py-3 px-6 text-center">Part</th> */}
                            {/* <th className="py-3 px-6 text-center">Nozzle Size</th> */}
                            <th className="py-3 px-6 text-center">Weight</th>
                            <th className="py-3 px-6 text-center">Date</th>
                            <th className="py-3 px-6 text-center w-1/2">Notes</th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {printsData.map((print, index) => {
                            var printDate = new Date(print.date);
                            return (
                                <Fragment key={index}> {editPrintId !== print._id ? (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.printer.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.estPrintTime}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.actPrintTime}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {print.status === 'Printing' ? (<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{print.status}</span>) : print.status === 'Done' ? (<span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{print.status}</span>) : print.status === 'Failed' ? (<span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{print.status}</span>) : print.status === 'Canceled' ? (<span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">{print.status}</span>) : (<span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">{print.status}</span>)}
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{`${print.filamentId?.brand} ${print.filamentId?.type} ${print.filamentId?.color}`}</span>
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex item-center justify-center">
                                                    <span className="font-medium">{print.settingsId}</span>
                                                </div>
                                            </td> */}
                                        {/* <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex item-center justify-center">
                                                    <span className="font-medium">{print.partId}</span>
                                                </div>
                                            </td> */}
                                        {/* <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.nozelSize}</span>
                                            </div>
                                        </td> */}
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{print.weight}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex item-center justify-center">
                                                <span className="font-medium">{printDate.toDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center ">
                                            <div className="flex items-center justify-center">
                                                {print.notes}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, print)}
                                                    icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(print._id)} icon={faDumpster} />
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    <Fragment key={index}>
                                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <input type="text" name="name" className="border w-28" value={editPrintData.name} onChange={handleEditFormChange} />
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <select type="text" name="printer" className="border" onChange={handleEditFormChange} >
                                                    <option value="">Printer</option>
                                                    {printersData.map((printer, index) => {
                                                        return (<option key={index} value={printer._id}>{`${printer.name}`}</option>)
                                                    })}
                                                </select>
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <input type="text" name="estPrintTime" className="border w-28" value={editPrintData.estPrintTime} onChange={handleEditFormChange} />
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <input type="text" name="actPrintTime" className="border w-28" value={editPrintData.actPrintTime} onChange={handleEditFormChange} />
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <select type="text" name="status" className="border" value={editPrintData.status} onChange={handleEditFormChange}>
                                                    <option value="">Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Printing">Printing</option>
                                                    <option value="Done">Done</option>
                                                    <option value="Failed">Failed</option>
                                                    <option value="Canceled">Canceled</option>
                                                </select>
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
                                                <input type="text" name="weight" className="border w-28" value={editPrintData.weight} onChange={handleEditFormChange} />
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <input type="date" name="date" className="border w-36" value={editPrintData.date} onChange={handleEditFormChange} />
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <textarea name="notes" type="text" className="border w-72" rows="2" cols="500" onChange={handleEditFormChange} >{editPrintData.notes}</textarea>
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <button
                                                    onClick={handleEditFormSubmit}
                                                ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                                <button type="button" onClick={handleCancelClick}>
                                                    <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                                </button>
                                            </td>
                                        </tr>
                                    </Fragment>)}
                                </Fragment>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}