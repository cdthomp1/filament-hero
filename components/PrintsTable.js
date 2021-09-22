import React, { Fragment, useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'


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

    const handleEditClick = (event, print) => {
        event.preventDefault();
        SetEditPrintId(print._id);

        const formValues = {
            name: print.name,
            description: print.description,
            filamentId: addFormData.filament,
            filamentName: filamentsData.where(filament => filament._id === addFormData.filament),
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
        <div className="flex flex-col items-center w-full">
            {printsData.length > 0 ?
                <><table className="shadow-lg border-collapse border w-9/12 table-fixed mb-4">
                    <thead>
                        <tr>
                            <th className="bg-blue-100 border text-xl">Name</th>
                            <th className="bg-blue-100 border text-xl">Description</th>
                            <th className="bg-blue-100 border text-xl">Filament</th>
                            <th className="bg-blue-100 border text-xl">Duration</th>
                            <th className="bg-blue-100 border text-xl ">Weight</th>
                            <th className="bg-blue-100 border text-xl "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {printsData.map((print, index) => {
                            return (
                                <Fragment key={index}> {editPrintId !== print._id ? (
                                    <tr className='even:bg-gray-100'>
                                        <td className="text-center">{print.name}</td>
                                        <td className="text-center">{print.description}</td>
                                        <td className="text-center">{print.filamentName}</td>
                                        <td className="text-center">{print.duration}</td>
                                        <td className="text-center">{print.weight}</td>
                                        <td className="text-center "><FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, print)}
                                            icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(print._id)} icon={faDumpster} /></td>
                                    </tr>) :
                                    (<tr key={index}>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="text"
                                                required="required"
                                                placeholder="Enter a name..."
                                                name="name"
                                                value={editPrintData.name}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="text"
                                                required="required"
                                                placeholder="Enter a description..."
                                                name="description"
                                                value={editPrintData.description}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td className="text-center">
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
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="number"
                                                required="required"
                                                placeholder="Enter a duration..."
                                                name="duration"
                                                value={editPrintData.duration}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="number"
                                                required="required"
                                                placeholder="Enter a weight..."
                                                name="weight"
                                                value={editPrintData.weight}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={handleEditFormSubmit}
                                            ><FontAwesomeIcon className="m-1 cursor-pointer" icon={faSave} /></button>
                                            <button type="button" onClick={handleCancelClick}>
                                                <FontAwesomeIcon className="m-1 cursor-pointer" icon={faWindowClose} />
                                            </button>
                                        </td>
                                    </tr>)}

                                </Fragment>)
                        })}
                    </tbody>
                </table>
                    <form className="flex flex-row w-9/12 justify-evenly" onSubmit={handleAddFormSubmit}>
                        <input
                            className="border"
                            type="text"
                            name="name"
                            required="required"
                            placeholder="Enter a print name..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border"
                            type="text"
                            name="description"
                            required="required"
                            placeholder="Enter a description..."
                            onChange={handleAddFormChange}
                        />
                        <select
                            className="border"
                            required="required"
                            name="filament"
                            placeholder="Filament"
                            onChange={handleAddFormChange}
                        >
                            <option value="" selected disabled hidden>Filament</option>
                            {filamentsData.map((filament, index) => {
                                return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                            })}
                        </select>
                        <input
                            className="border"
                            type="number"
                            required="required"
                            placeholder="Enter a duration..."
                            name="duration"

                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border"
                            type="number"
                            step="0.01"
                            name="weight"
                            required="required"
                            placeholder="Enter a weight..."
                            onChange={handleAddFormChange}
                        />
                        <button className="bg-gray-200 rounded p-1 hover:bg-green-400" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Print</button>
                    </form></>
                :
                <><p className="m-4">Add a Print!</p><form className="flex flex-row w-9/12 justify-evenly" onSubmit={handleAddFormSubmit}>
                    <input
                        className="border"
                        type="text"
                        name="name"
                        required="required"
                        placeholder="Enter a print name..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="text"
                        name="description"
                        required="required"
                        placeholder="Enter a description..."
                        onChange={handleAddFormChange}
                    />
                    <select
                        className="border w-40"
                        required="required"
                        name="filament"
                        placeholder="Filament"
                        onChange={handleAddFormChange}
                    >
                        <option value="" selected disabled hidden>Filament</option>
                        {filamentsData.map((filament, index) => {
                            return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                        })}
                    </select>
                    <input
                        className="border"
                        type="number"
                        required="required"
                        placeholder="Enter a duration..."
                        name="duration"

                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="number"
                        step="0.01"
                        name="weight"
                        required="required"
                        placeholder="Enter a weight..."
                        onChange={handleAddFormChange}
                    />
                    <button className="bg-gray-200 rounded p-1 hover:bg-green-400 w-20" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Print</button>
                </form></>}

        </div>
    )
}