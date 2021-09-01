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

export default function FilamentTable({ user }) {



    //const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments?userId=${user.sub}`, fetcher)

    const filamentsData = []

    /* const filamentsData = undefined */

    const filamentsError = false

    const [addFormData, setAddFormData] = useState({
        type: "",
        color: "",
        weight: 0,
        diameter: 0,
        weight: 0
    });

    const [editFilamentData, setEditFormData] = useState({
        type: "",
        color: "",
        weight: 0,
        diameter: 0,
        weight: 0
    });
    const [editFilamentId, setEditFilamentId] = useState(null);

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
        const newFormData = { ...editFilamentData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let newFilament
        if (user) {
            newFilament = {
                type: addFormData.type,
                color: addFormData.color,
                weight: addFormData.weight,
                diameter: addFormData.diameter,
                length: addFormData.length,
                userId: user.sub
            };
        }


        //console.log(newFilament)

        await fetcher("/api/filament/addFilament", {
            method: "post",
            body: JSON.stringify(newFilament)
        });

        mutate(`/api/filament/getFilaments?userId=${user.sub}`);

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
    if (!filamentsData) return (<table class="animate-pulse shadow-lg border-collapse border w-9/12 table-fixed mb-4">
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
    </table>)

    return (
        <div className="flex flex-col items-center w-full">
            {filamentsData.length > 0 ?
                <><table className="shadow-lg border-collapse border w-9/12 table-fixed mb-4">
                    <thead>
                        <tr>
                            <th className="bg-blue-100 border text-xl">Type</th>
                            <th className="bg-blue-100 border text-xl">Color</th>
                            <th className="bg-blue-100 border text-xl">Weight</th>
                            <th className="bg-blue-100 border text-xl">Diameter</th>
                            <th className="bg-blue-100 border text-xl ">Length</th>
                            <th className="bg-blue-100 border text-xl "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filamentsData.map((filament, index) => {
                            return (
                                <Fragment key={index}> {editFilamentId !== filament._id ? (
                                    <tr className='even:bg-gray-100'>
                                        <td className="text-center">{filament.type}</td>
                                        <td className="text-center">{filament.color}</td>
                                        <td className="text-center">{filament.weight}</td>
                                        <td className="text-center">{filament.diameter}</td>
                                        <td className="text-center">{filament.length}</td>
                                        <td className="text-center "><FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, filament)}
                                            icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(filament._id)} icon={faDumpster} /></td>
                                    </tr>) :
                                    (<tr key={index}>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="text"
                                                required="required"
                                                placeholder="Enter a type..."
                                                name="type"
                                                value={editFilamentData.type}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="text"
                                                required="required"
                                                placeholder="Enter a color..."
                                                name="color"
                                                value={editFilamentData.color}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="number"
                                                step="0.01"
                                                required="required"
                                                placeholder="Enter weight (grams)"
                                                name="weight"
                                                value={editFilamentData.weight}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="number"
                                                step="0.01"
                                                required="required"
                                                placeholder="Enter diameter..."
                                                name="diameter"
                                                value={editFilamentData.diameter}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td className="text-center">
                                            <input
                                                className="border"
                                                type="number"
                                                step="0.01"
                                                required="required"
                                                placeholder="Enter an length..."
                                                name="length"
                                                value={editFilamentData.length}
                                                onChange={handleEditFormChange}
                                            />
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
                            className="border p-1"
                            type="text"
                            name="type"
                            required="required"
                            placeholder="Enter a type..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border p-1"
                            type="text"
                            name="color"
                            required="required"
                            placeholder="Enter a color..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border p-1"
                            type="number"
                            step="0.01"
                            name="weight"
                            required="required"
                            placeholder="Enter a weight..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border p-1"
                            type="number"
                            step="0.01"
                            name="diameter"
                            required="required"
                            placeholder="Enter a diameter..."
                            onChange={handleAddFormChange}
                        />
                        <input
                            className="border p-1"
                            type="number"
                            step="0.01"
                            name="length"
                            required="required"
                            placeholder="Enter a length..."
                            onChange={handleAddFormChange}
                        />
                        <button className="bg-gray-200 rounded p-1 hover:bg-green-400" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Filament</button>
                    </form></>
                :
                <><p className="m-5">Add Some Filament!</p><form className="flex flex-col lg:flex-row md:flex-col sm:flex-col w-10/12 justify-evenly" onSubmit={handleAddFormSubmit}>
                    <input
                        className="border max-w-1/8"
                        type="text"
                        name="type"
                        required="required"
                        placeholder="Type"
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border max-w-1/8"
                        type="text"
                        name="color"
                        required="required"
                        placeholder="Color"
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border max-w-1/8"
                        type="number"
                        name="weight"
                        step="0.01"
                        required="required"
                        placeholder="Weight (Grams)"
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border max-w-1/8"
                        type="number"
                        name="diameter"
                        step="0.01"
                        required="required"
                        placeholder="Diameter"
                        onChange={handleAddFormChange}
                    />
                    <input
                        className="border max-w-1/8"
                        type="number"
                        name="length"
                        step="0.01"
                        placeholder="Length (mm)"
                        onChange={handleAddFormChange}
                    />
                    <button className="bg-gray-200 rounded p-1 hover:bg-green-400" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Filament</button>
                </form></>}

        </div>
    )
}