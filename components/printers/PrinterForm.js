import React, { useState } from 'react'
import { mutate } from 'swr'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const fetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()

    if (res.status !== 200) {
        //throw new Error(data.message)
        notifyError('Not all form fields are filled out')
    }
    return res
}

const notifySuccess = (message) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
    });

};

const notifyError = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    draggable: true,
});

const PrinterForm = ({ user, filamentsData }) => {
    const [addFormData, setAddFormData] = useState({
        name: "",
        make: "",
        model: "",
        bedWidth: 0,
        bedLength: 0,
        buildHeight: 0,
        currentFilament: "",
        status: "",
        // image: "",
        notes: "",
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
        let newPrinter;


        if (user) {
            let filament = filamentsData.find(filament => filament._id === addFormData.currentFilament)
            newPrinter = {
                name: addFormData.name,
                make: addFormData.make,
                model: addFormData.model,
                bedWidth: addFormData.bedWidth,
                bedLength: addFormData.bedLength,
                buildHeight: addFormData.buildHeight,
                description: addFormData.description,
                currentFilament: filament,
                status: addFormData.status,
                // image: addFormData.image,
                notes: addFormData.notes,
                userId: user.sub
            };
        }



        var res = await fetcher("/api/printer/createPrinter", {
            method: "post",
            body: JSON.stringify(newPrinter)
        });

        // const data = await res.json()
        
        if (res.status === 200) {
            notifySuccess('Filament Created! 🎉');
            event.target.reset()
        }

    };




    if (!filamentsData) return (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg></>)

    return (
        <div className="border-b border-gray-200 flex flex-col justify-center">
            
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                rtl={false}
                draggable
            />
            <form onSubmit={handleAddFormSubmit} className="text-center">
                <div className="py-3 px-6">
                    <label htmlFor="name" className="text-lg">Name</label><br />
                    <input type="text" name="name" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="make" className="text-lg">Make</label><br />
                    <input type="text" name="make" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="model" className="text-lg">Model</label><br />
                    <input type="text" name="model" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="bedWidth" className="text-lg">Bed Width</label><br />
                    <input type="text" name="bedWidth" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="bedLength" className="text-lg">Bed Length</label><br />
                    <input type="text" name="bedLength" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="buildheight" className="text-lg">Build Height</label><br />
                    <input type="text" name="buildHeight" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="currentFilament" className="text-lg">Curent Filament</label><br />
                    <select type="text" name="currentFilament" className="border w-72" onChange={handleAddFormChange} >
                        <option value="">Filament</option>
                        {filamentsData.map((filament, index) => {
                            return (<option key={index} value={filament._id}>{`${filament.type} ${filament.color}`}</option>)
                        })}
                    </select>
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="status" className="text-lg">Status</label><br />
                    <select type="text" name="status" className="border w-72" onChange={handleAddFormChange}>
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Printing">Printing</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Down">Down</option>
                    </select>
                </div>
                {/* <div className="py-3 px-6"> // NOT READY FOR THIS ONE YET
                    <label htmlFor="file">File</label><br />
                    <input type="file" name="image" id="" onChange={handleAddFormChange} />
                </div> */}
                <div className="py-3 px-6">
                    <label htmlFor="notes" className="text-lg">Notes</label><br />
                    <textarea name="notes" name="notes" type="text" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-purple-500 text-purple-500 text-lg rounded-lg transition-colors duration-300 transform hover:bg-purple-500 hover:text-gray-100 focus:border-4 focus:border-purple-300" type="submit"><FontAwesomeIcon className="mt-1 cursor-pointer" icon={faPlus} /> Printer</button>
                </div>
            </form>
        </div>
    )
}

export default PrinterForm