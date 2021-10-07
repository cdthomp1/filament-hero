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


export default function FilamentForm({ user, onFormAdd }) {

    console.log(user)

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
                length: 0,
                userId: user.sub
            };
        }


        //console.log(newFilament)

        await fetcher("/api/filament/addFilament", {
            method: "post",
            body: JSON.stringify(newFilament)
        });

        onFormAdd(event)

        mutate(`/api/filament/getFilaments?userId=${user.sub}`);

        for (var i = 0; i < event.target.elements.length; i++) {
            event.target.elements[i].value = ''
        }

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

    return (
        <>
            <form className="grid grid-cols-4 gap-1" onSubmit={handleAddFormSubmit}>
                <input
                    className="border"
                    type="text"
                    name="type"
                    required="required"
                    placeholder="Type"
                    onChange={handleAddFormChange}
                />

                <input
                    className="border"
                    type="text"
                    name="color"
                    required="required"
                    placeholder="Color"
                    onChange={handleAddFormChange}
                />
                <input
                    className="border"
                    type="number"
                    name="weight"
                    step="0.01"
                    required="required"
                    placeholder="Weight (Grams)"
                    onChange={handleAddFormChange}
                />
                <input
                    className="border"
                    type="number"
                    name="diameter"
                    step="0.01"
                    required="required"
                    placeholder="Diameter"
                    onChange={handleAddFormChange}
                />

                <button className="bg-gray-200 rounded p-1 hover:bg-green-400 col-span-4" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer w-12" icon={faPlus} /> Filament</button>
            </form>
        </>
    )
}


