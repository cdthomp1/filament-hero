import React, { Fragment, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import PrintForm from './PrintForm'


const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

export default function PrintsTable({ user }) {
    const { data: printsData, error: printsError } = useSWR(`/api/print/getPrints?userId=${user.sub}`, fetcher)
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)


    const [addFormData, setAddFormData] = useState({
        name: "",
        description: "",
        filamentId: "",
        filamentName: "",
        duration: 0,
        weight: 0,
        userId: ""
    });

    const [editPrintData, setEditFormData] = useState({
        name: "",
        description: "",
        filamentId: "",
        filamentName: "",
        duration: 0,
        weight: 0,
        userId: ""
    });
    const [editPrintId, SetEditPrintId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;


        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editPrintData };

        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let newPrint;

        if (user) {
            let filament = filamentsData.find(filament => filament._id === addFormData.filament)
            newPrint = {
                name: addFormData.name,
                description: addFormData.description,
                filamentId: addFormData.filament,
                filamentName: `${filament.type} ${filament.color} `,
                duration: addFormData.duration,
                weight: addFormData.weight,
                userId: user.sub
            };
        }

        var printFilament = await fetcher("/api/filament/getFilament?id=" + newPrint.filamentId)
        var updatedFilament = {
            type: printFilament.type,
            color: printFilament.color,
            length: printFilament.length,
            diameter: printFilament.diameter,
            weight: printFilament.weight - newPrint.weight,
            userId: printFilament.userId
        }

        await fetcher("/api/print/addPrint", {
            method: "post",
            body: JSON.stringify(newPrint)
        });

        await fetcher("/api/filament/updateFilament?id=" + printFilament._id, {
            method: "put",
            body: JSON.stringify(updatedFilament)
        });

        mutate(`/api/print/getPrints?userId=${user.sub}`);
        mutate(`/api/filament/getFilaments?userId=${user.sub}`);

    };

    const handleEditFormSubmit = async () => {
        await fetcher("/api/print/updatePrint?id=" + editPrintId, {
            method: "put",
            body: JSON.stringify(editPrintData)
        });
        mutate(`/api/print/getPrints?userId=${user.sub}`);
        SetEditPrintId(null);
    };

    const handleFormUpdate = (event) => {
        console.log(event)
        mutate(`/api/print/getPrints?userId=${user.sub}`);

    }

    const handleEditClick = (event, print) => {
        event.preventDefault();
        SetEditPrintId(print._id);

        console.log(print)

        const formValues = {
            name: print.name,
            description: print.description,
            filamentId: addFormData.filament,
            filamentName: filamentsData.find(filament => filament._id === addFormData.filament),
            duration: print.duration,
            weight: print.weight,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        SetEditPrintId(null);
    };

    const handleDeleteClick = async (printId) => {
        const res = await fetcher("/api/print/deletePrint", {
            method: "delete",
            body: JSON.stringify({ id: printId })
        });


        mutate(`/api/print/getPrints?userId=${user.sub}`);

    };

    if (printsError || filamentsError) return <div>{printsError.message || filamentsError.message}</div>
    if (!printsData || !filamentsData) return (
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


    return (
        <div className="flex flex-col w-7/12">
            {printsData.length > 0 ?
                <>

                    <div className="grid grid-cols-6 gap-x-1">
                        <div className="text-blue-700 lg:text-2xl">Name</div>
                        <div className="text-blue-700 lg:text-2xl">Description</div>
                        <div className="text-blue-700 lg:text-2xl">Filament</div>
                        <div className="text-blue-700 lg:text-2xl">Duration</div>
                        <div className="text-blue-700 lg:text-2xl ">Weight</div>
                    </div>
                    {printsData.map((print, index) => {
                        return (
                            <Fragment key={index}> {editPrintId !== print._id ? (
                                <div className='grid grid-cols-6 gap-x-1 w-full border border-b-1'>
                                    <div className="p-1">{print.name}</div>
                                    <div className="p-1">{print.description}</div>
                                    <div className="p-1">{print.filamentName}</div>
                                    <div className="p-1">{print.duration}</div>
                                    <div className="p-1">{print.weight}</div>
                                    <div className="p-1"><FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, print)}
                                        icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(print._id)} icon={faDumpster} /></div>
                                </div>) :
                                (<div key={index} className="grid grid-cols-6 gap-x-1">
                                    <div className="text-center">
                                        <input
                                            className="border"
                                            type="text"
                                            required="required"
                                            placeholder="Name"
                                            name="name"
                                            value={editPrintData.name}
                                            onChange={handleEditFormChange}
                                        ></input>
                                    </div>
                                    <div className="text-center">
                                        <input
                                            className="border"
                                            type="text"
                                            required="required"
                                            placeholder="Description"
                                            name="description"
                                            value={editPrintData.description}
                                            onChange={handleEditFormChange}
                                        ></input>
                                    </div>
                                    <div className="text-center">
                                        <select
                                            className="border"
                                            required="required"
                                            name="filament"
                                            value={filamentsData[0]._id}
                                            onChange={handleEditFormChange}
                                        >
                                            {filamentsData.map((filament, index) => {
                                                //console.log("HELLO")
                                                return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <input
                                            className="border"
                                            type="number"
                                            required="required"
                                            placeholder="Duration"
                                            name="duration"
                                            value={editPrintData.duration}
                                            onChange={handleEditFormChange}
                                        ></input>
                                    </div>
                                    <div className="text-center">
                                        <input
                                            className="border"
                                            type="number"
                                            required="required"
                                            placeholder="Weight"
                                            name="weight"
                                            value={editPrintData.weight}
                                            onChange={handleEditFormChange}
                                        ></input>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={handleEditFormSubmit}
                                        ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                        <button type="button" onClick={handleCancelClick}>
                                            <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                        </button>
                                    </div>
                                </div>)}

                            </Fragment>)
                    })}
                    <div className="mt-4"><PrintForm  user={user} onFormAdd={handleFormUpdate} filamentsData={filamentsData} /></div>
                </>
                :
                <><p className="m-4">Add a Print!</p><PrintForm user={user} onFormAdd={handleFormUpdate} filamentsData={filamentsData} /></>}

        </div>
    )
}