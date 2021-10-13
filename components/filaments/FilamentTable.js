import React, { Fragment, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import FilamentForm from './FilamentForm'



const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function FilamentTable({ user }) {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    const [editFilamentData, setEditFormData] = useState({
        type: "",
        color: "",
        weight: 0,
        diameter: 0,
        weight: 0
    });
    const [editFilamentId, setEditFilamentId] = useState(null);

    const handleFormUpdate = (event) => {
        console.log(event)
        mutate(`/api/filament/getFilaments?userId=${user.sub}`);

    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newFormData = { ...editFilamentData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };


    const handleEditFormSubmit = async () => {
        await fetcher("/api/filament/updateFilament?id=" + editFilamentId, {
            method: "put",
            body: JSON.stringify(editFilamentData)
        });
        mutate(`/api/filament/getFilaments?userId=${user.sub}`);
        setEditFilamentId(null);
    };

    const handleEditClick = (event, filament) => {
        event.preventDefault();
        setEditFilamentId(filament._id);

        const formValues = {
            type: filament.type,
            color: filament.color,
            length: filament.length,
            diameter: filament.diameter,
            weight: filament.weight,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditFilamentId(null);
    };

    const handleDeleteClick = async (filamentId) => {
        const res = await fetcher("/api/filament/deleteFilament", {
            method: "delete",
            body: JSON.stringify({ id: filamentId })
        });

        mutate(`/api/filament/getFilaments?userId=${user.sub}`);
    };




    if (filamentsError) return <div>{filamentsError.message}</div>
    if (!filamentsData) return (<><table className="animate-pulse shadow-lg border-collapse border w-6/12 table-fixed mb-4">
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
    </table></>)

    return (
        <div className="flex flex-col w-7/12">
            {filamentsData.length > 0 ?
                <>
                    <div className='grid grid-cols-5 gap-x-1 '>
                        <div className="text-blue-700 dark:text-blue-400 lg:text-2xl">Type</div>
                        <div className="text-blue-700 dark:text-blue-400 lg:text-2xl">Color</div>
                        <div className="text-blue-700 dark:text-blue-400 lg:text-2xl">Weight</div>
                        <div className=" text-blue-700 dark:text-blue-400 lg:text-2xl">Diameter</div>
                    </div>
                    {filamentsData.map((filament, index) => {
                        return (
                            <Fragment key={index}> {editFilamentId !== filament._id ? (
                                <div className='grid grid-cols-5 gap-x-1 w-full border border-b-1'>
                                    <div id="index" className="p-1">{filament.type}</div>
                                    <div id="index" className="p-1">{filament.color}</div>
                                    <div id="index" className="p-1">{filament.weight}</div>
                                    <div id="index" className="p-1">{filament.diameter}</div>
                                    <div id="index"><FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, filament)}
                                        icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(filament._id)} icon={faDumpster} /></div>
                                </div>) : (
                                <div className='grid grid-cols-5 gap-x-10'>
                                    <div >
                                        <input
                                            className="border w-28"
                                            type="text"
                                            required="required"
                                            placeholder="Enter a type..."
                                            name="type"
                                            value={editFilamentData.type}
                                            onChange={handleEditFormChange}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            className="border w-28"
                                            type="text"
                                            required="required"
                                            placeholder="Enter a color..."
                                            name="color"
                                            value={editFilamentData.color}
                                            onChange={handleEditFormChange}
                                        />
                                    </div>

                                    <div>
                                        <input
                                            className="border w-28"
                                            type="number"
                                            step="0.01"
                                            required="required"
                                            placeholder="Enter weight (grams)"
                                            name="weight"
                                            value={editFilamentData.weight}
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                    <div>

                                        <input
                                            className="border w-28"
                                            type="number"
                                            step="0.01"
                                            required="required"
                                            placeholder="Enter diameter..."
                                            name="diameter"
                                            value={editFilamentData.diameter}
                                            onChange={handleEditFormChange}
                                        />
                                    </div>
                                    <div className="w-28">
                                        <button
                                            onClick={handleEditFormSubmit}
                                        ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                        <button type="button" onClick={handleCancelClick}>
                                            <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                        </button>
                                    </div>
                                </div>
                            )
                            }</Fragment>)

                    })
                    }
                    <div className="mt-4"><FilamentForm user={user} onFormAdd={handleFormUpdate} /></div>
                </>
                :
                <div className="flex flex-col justify-content-center">
                    <p>Add Some Filament!</p>
                    <FilamentForm user={user} onFormAdd={handleFormUpdate} />
                </div>
            }

        </div >
    )
}