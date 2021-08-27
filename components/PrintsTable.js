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

    console.log(printsData)

    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    console.log(filamentsData)

    const [addFormData, setAddFormData] = useState({
        name: "",
        description: "",
        filament: "",
        duration: 0,
        weight: 0,
        userId: ""
    });

    const [editPrintData, setEditFormData] = useState({
        name: "",
        description: "",
        filament: "",
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
        console.log(...editPrintData)
        const newFormData = { ...editPrintData };
        console.log(newFormData)
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let newPrint;
        if (user) {
            newPrint = {
                name: addFormData.name,
                description: addFormData.color,
                filament: addFormData.weight,
                duration: addFormData.diameter,
                weight: addFormData.length,
                userId: user.sub
            };
        }


        console.log(newPrint)

        await fetcher("/api/print/addPrint", {
            method: "post",
            body: JSON.stringify(newPrint)
        });

        mutate(`/api/print/getPrints?userId=${user.sub}`);

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
            filament: print.filament,
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




    if (printsError) return <div>{printsError.message}</div>
    if (!printsData) return <div>Loading...</div>

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-5xl m-3">Prints</h1>
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
                                        <td className="text-center">{print.filament}</td>
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
                                                onChange={handleEditFormChange}
                                            >
                                                {filamentsData.map((filament, index) => {
                                                    console.log("HELLO")
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
                            name="type"
                            required="required"
                            placeholder="Enter a type..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border"
                            type="text"
                            name="color"
                            required="required"
                            placeholder="Enter a color..."
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
                        <input
                            className="border"
                            type="number"
                            step="0.01"
                            name="diameter"
                            required="required"
                            placeholder="Enter a diameter..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border"
                            type="number"
                            step="0.01"
                            name="length"
                            required="required"
                            placeholder="Enter a length..."
                            onChange={handleAddFormChange}
                        />
                        <button className="bg-gray-200 rounded p-1 hover:bg-green-400" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Print</button>
                    </form></>
                :
                <><p>Add a Print!</p><form className="flex flex-row w-12/12" onSubmit={handleAddFormSubmit}>
                    <input
                        className="border"
                        type="text"
                        name="type"
                        required="required"
                        placeholder="Enter a type..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="text"
                        name="color"
                        required="required"
                        placeholder="Enter a color..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="number"
                        name="weight"
                        required="required"
                        placeholder="Enter a weight..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="number"
                        name="diameter"
                        required="required"
                        placeholder="Enter a diameter..."
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border"
                        type="number"
                        name="length"
                        required="required"
                        placeholder="Enter a length..."
                        onChange={handleAddFormChange}
                    />

                    <button type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Print</button>
                </form></>}

        </div>
    )
}