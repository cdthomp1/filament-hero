import React, { Fragment, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { dirtyFetcher, fetcher } from '../../lib/fetchers'
import { notifySuccess, notifyError } from '../../lib/toasts';

export default function FilamentTable({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    const [editFilamentData, setEditFormData] = useState({
        brand: "",
        type: "",
        color: "",
        length: 0,
        diameter: 0,
        weight: 0,
        printingNozelTemp: 0,
        printingBedTemp: 0,
        maxOverHangDistance: 0,
        maxOverHangAngle: 0,
        generalNotes: ""
    });
    const [editFilamentId, setEditFilamentId] = useState(null);

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editFilamentData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async () => {
        var res = await dirtyFetcher("/api/filament/editFilament?id=" + editFilamentId, {
            method: "put",
            body: JSON.stringify(editFilamentData)
        });
        mutate(`/api/filament/getFilaments?userId=${user.sub}`);
        setEditFilamentId(null);

        if (res.status === 200) {
            notifySuccess(`${editFilamentData.brand} ${editFilamentData.type} ${editFilamentData.color} updated! 🎉`)
        } else {
            notifyError(`A server error occured. ${res.message}`)
        }
    };

    const handleEditClick = (event, filament) => {
        event.preventDefault();
        setEditFilamentId(filament._id);

        const formValues = {
            brand: filament.brand,
            type: filament.type,
            color: filament.color,
            length: filament.length,
            diameter: filament.diameter,
            weight: filament.weight,
            printingNozelTemp: filament.printingNozelTemp,
            printingBedTemp: filament.printingBedTemp,
            maxOverHangDistance: filament.maxOverHangDistance,
            maxOverHangAngle: filament.maxOverHangAngle,
            generalNotes: filament.generalNotes
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditFilamentId(null);
    };

    const handleDeleteClick = async (filamentId) => {
        const res = await dirtyFetcher("/api/filament/deleteFilament", {
            method: "delete",
            body: JSON.stringify({ id: filamentId })
        });

        if (res.status === 200) {
            notifySuccess('Filament Deleted 🎉')
        } else {
            notifyError(`A server error occured. ${res.message}`)
        }

        mutate(`/api/filament/getFilaments?userId=${user.sub}`);
    };

    if (filamentsError) return <div>{filamentsError.message}</div>
    if (!filamentsData) return (<>
        {/* Skeleton Loader */}
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
                </tr>

            </tbody>
        </table>
    </>)

    return (
        <>
            <div className="w-11/12 m-auto overflow-x-auto">
                <table className="table-auto ">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center w-1/12">Brand</th>
                            <th className="py-3 px-6 text-center">type</th>
                            <th className="py-3 px-6 text-center">Color</th>
                            <th className="py-3 px-6 text-center w-1/12">Weight<br /><small>Grams</small></th>
                            <th className="py-3 px-6 text-center">Diameter</th>
                            <th className="py-3 px-0.5 text-center ">Nozzle Temp <small><span>&#176;</span>C</small></th>
                            <th className="py-3 px-0.5 text-center ">Bed Temp <small><span>&#176;</span>C</small></th>
                            <th className="py-3 px-6 text-center">Overhang Legnth</th>
                            <th className="py-3 px-6 text-center">Overhang Angle</th>
                            <th className="py-3 px-6 text-center w-1/3">Notes</th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filamentsData.map((filament, index) => {
                            return (
                                <Fragment key={index}> {editFilamentId !== filament._id ? (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center">
                                                {filament.brand}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center max-w-min">
                                            <div className="flex items-center justify-center">
                                                <div className="mr-2">
                                                    {filament.type}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center max-w-min">
                                            <div className="flex items-center justify-center">
                                                {filament.color}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {filament.weight}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                {filament.diameter}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                {filament.printingNozelTemp}
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                {filament.printingBedTemp}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {filament.maxOverHangDistance}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                {filament.maxOverHangAngle}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                {filament.generalNotes}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, filament)}
                                                    icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(filament._id)} icon={faDumpster} />
                                            </div>
                                        </td>
                                    </tr>) : (
                                    <Fragment key={index}><tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="brand" className="border w-28" value={editFilamentData.brand} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="type" className="border w-28" value={editFilamentData.type} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="color" className="border w-28" value={editFilamentData.color} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="weight" className="border w-28" value={editFilamentData.weight} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="diameter" className="border w-28" value={editFilamentData.diameter} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="printingNozelTemp" className="border w-28" value={editFilamentData.printingNozelTemp} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="printingBedTemp" className="border w-28" value={editFilamentData.printingBedTemp} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="maxOverHangDistance" className="border w-28" value={editFilamentData.maxOverHangDistance} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input type="text" name="maxOverHangAngle" className="border w-28" value={editFilamentData.maxOverHangAngle} onChange={handleEditFormChange} />
                                        </td>

                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <input name="generalNotes" type="text" className="border w-28" value={editFilamentData.generalNotes} onChange={handleEditFormChange} />
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            <button
                                                onClick={handleEditFormSubmit}
                                            ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                            <button type="button" onClick={handleCancelClick}>
                                                <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                            </button>
                                        </td>
                                    </tr> </Fragment>
                                )
                                }</Fragment>)
                        })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}