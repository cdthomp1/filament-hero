import React, { useState } from 'react'
import { mutate } from 'swr'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { fetcher, dirtyFetcher } from '../../lib/fetchers'
import { notifySuccess, notifyError } from '../../lib/toasts';

const PrintForm = ({ user, filamentsData, printersData }) => {
    const [addFormData, setAddFormData] = useState({
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
            newPrint = {
                name: addFormData.name,
                printer: addFormData.printer,
                stlUrl: addFormData.stlUrl,
                estPrintTime: addFormData.estPrintTime,
                actPrintTime: "",
                filamentId: addFormData.filamentId,
                notes: addFormData.notes,
                status: addFormData.status,
                partId: "",
                settingsId: "",
                nozelSize: "", // This might be apart of the settings object
                filamentLength: addFormData.length,
                weight: addFormData.weight,
                date: Date.now(),
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

        var res = await dirtyFetcher("/api/print/addPrint", {
            method: "post",
            body: JSON.stringify(newPrint)
        });

        await fetcher("/api/filament/editFilament?id=" + printFilament._id, {
            method: "put",
            body: JSON.stringify(updatedFilament)
        });

        if (res.status === 200) {
            notifySuccess('Print Created! 🎉');
            event.target.reset()
        }
    };

    if (!filamentsData || !printersData) return (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg></>)

    return (
        <>
            <form className="text-center" onSubmit={handleAddFormSubmit}>
                <div className="py-3 px-6">
                    <label htmlFor="name" className="text-lg">Name</label><br />
                    <input type="text" name="name" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="estPrintTime" className="text-lg">Est. Print Time</label><br />
                    <input type="text" name="estPrintTime" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="date" className="text-lg">Weight</label><br />
                    <input type="number" name="weight" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="printer" className="text-lg">Printer</label><br />
                    <select type="text" name="printer" className="border w-72" onChange={handleAddFormChange} >
                        <option value="">Printer</option>
                        {printersData.map((printer, index) => {
                            return (<option key={index} value={printer._id}>{`${printer.name}`}</option>)
                        })}
                    </select>
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="filamentId" className="text-lg">Curent Filament</label><br />
                    <select type="text" name="filamentId" className="border w-72" onChange={handleAddFormChange} >
                        <option value="">Filament</option>
                        {filamentsData.map((filament, index) => {
                            return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                        })}
                    </select>
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="date" className="text-lg">Date</label><br />
                    <input type="date" name="date" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="status" className="text-lg">Status</label><br />
                    <select type="text" name="status" className="border w-72" onChange={handleAddFormChange}>
                        <option value="">Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Printing">Printing</option>
                        <option value="Done">Down</option>
                        <option value="Failed">Failed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="notes" className="text-lg">Notes</label><br />
                    <textarea name="notes" name="notes" type="text" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="make" className="text-lg">STL URL</label><br />
                    <input type="text" name="stlUrl" className="border w-72" onChange={handleAddFormChange} />
                </div>

                <div className="py-3 px-6">
                    <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Printer</button>
                </div>
            </form>
        </>
    )
}

export default PrintForm