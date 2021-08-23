import React, { Fragment, useState } from 'react'
import useSWR from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit } from '@fortawesome/free-solid-svg-icons'

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}

const FilamentTable = () => {
    const { data: filamentsData, error: filamentsError } = useSWR(`/api/filament/getFilaments`, fetcher)
    const [filaments, setFilaments] = useState(filamentsData);
    console.log(filaments)

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

    /*     const handleAddFormSubmit = (event) => {
            event.preventDefault();
    
            const newContact = {
                id: nanoid(),
                fullName: addFormData.fullName,
                address: addFormData.address,
                phoneNumber: addFormData.phoneNumber,
                email: addFormData.email,
            };
    
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
        }; */

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedFilament = {
            _id: editFilamentId,
            type: editFilamentData.type,
            color: editFilamentData.color,
            length: editFilamentData.length,
            diameter: editFilamentData.diameter,
            weight: editFilamentData.weight,
        };

        console.log(filaments)
        const newFilaments = [...filaments];

        const index = filamentsData.findIndex((filament) => filament._id === editFilamentId);

        newFilaments[index] = editedFilament;

        setFilaments(newFilaments);
        console.log(filaments)
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

    const handleDeleteClick = (filamentId) => {
        const newFilaments = [...filamentsData];

        const index = filamentsData.findIndex((filament) => f.id === filamentId);

        newFilaments.splice(index, 1);

        setFilaments(newFilaments);
    };

    if (filamentsError) return <div>{filamentsError.message}</div>
    if (!filamentsData) return <div>Loading...</div>

    return (
        <div>
            Filament
           {/*  <form onSubmit={handleEditFormSubmit}>
                <table className="border-collapse border border-green-500">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Color</th>
                            <th>Weight</th>
                            <th>Diameter</th>
                            <th>Length</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filaments.map((filament, index) => {
                            const bgcolor = `bg-${filament.color.toLowerCase()}-200`
                            return (
                                <Fragment key={index}> {editFilamentId !== filament._id ? (
                                    <tr className={bgcolor}>
                                        <td>{filament.type}</td>
                                        <td>{filament.color}</td>
                                        <td>{filament.weight}</td>
                                        <td>{filament.diameter}</td>
                                        <td>{filament.length}</td>
                                        <td><FontAwesomeIcon className="m-1 cursor-pointer" onClick={(event) => handleEditClick(event, filament)}
                                            icon={faEdit} /><FontAwesomeIcon className="m-1" onClick={() => handleDeleteClick(filament._id)} icon={faDumpster} /></td>
                                    </tr>) :
                                    (<tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                required="required"
                                                placeholder="Enter a type..."
                                                name="type"
                                                value={editFilamentData.type}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                required="required"
                                                placeholder="Enter a color..."
                                                name="color"
                                                value={editFilamentData.color}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                required="required"
                                                placeholder="Enter weight..."
                                                name="weight"
                                                value={editFilamentData.weight}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                required="required"
                                                placeholder="Enter diameter..."
                                                name="diameter"
                                                value={editFilamentData.diameter}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                required="required"
                                                placeholder="Enter an length..."
                                                name="length"
                                                value={editFilamentData.length}
                                                onChange={handleEditFormChange}
                                            ></input>
                                        </td>
                                        <td>
                                            <button type="submit">Save</button>
                                            <button type="button" onClick={handleCancelClick}>
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>)}
                                </Fragment>)
                        })}
                    </tbody>
                </table>
            </form> */}
        </div>
    )
}

export default FilamentTable
