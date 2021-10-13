import React, { useState } from 'react'
import { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const PrintForm = ({ user, onFormAdd, filamentsData }) => {

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

    return (
        <>
            <form className="grid grid-cols-5 gap-1" onSubmit={handleAddFormSubmit}>
                <input
                    className="border"
                    type="text"
                    name="name"
                    required="required"
                    placeholder="Name"
                    onChange={handleAddFormChange}
                />
                <input
                    className="border"
                    type="text"
                    name="description"
                    required="required"
                    placeholder="Description"
                    onChange={handleAddFormChange}
                />
                <select
                    className="border"
                    required="required"
                    name="filament"
                    placeholder="Filament"
                    onChange={handleAddFormChange}
                    defaultValue=""
                >
                    <option value="" disabled hidden>Filament</option>
                    {filamentsData.map((filament, index) => {
                        return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                    })}
                </select>
                <input
                    className="border"
                    type="number"
                    required="required"
                    placeholder="Duration"
                    name="duration"

                    onChange={handleAddFormChange}
                />
                <input
                    className="border"
                    type="number"
                    step="0.01"
                    name="weight"
                    required="required"
                    placeholder="Weight"
                    onChange={handleAddFormChange}
                />
                <button className="bg-gray-200 rounded p-1 hover:bg-green-400 col-span-5 " type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Print</button>
            </form></>


    )
}

export default PrintForm
