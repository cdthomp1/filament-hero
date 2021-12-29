import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { dirtyFetcher } from '../../lib/fetchers'
import { notifySuccess, notifyError } from '../../lib/toasts';

export default function FilamentForm({ user }) {
    const router = useRouter();
    const [addFormData, setAddFormData] = useState({
        brand: "",
        type: "",
        color: "",
        length: 0,
        diameter: 0,
        weight: 0,
        printingNozelTemp: 0,
        printingBedTemp: 0,
        maxOverHangDistance: 0,
        maxOverHangAngle: 0,
        notes: ''
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
        let newFilament
        if (user) {
            newFilament = {
                brand: addFormData.brand,
                type: addFormData.type,
                color: addFormData.color,
                length: addFormData.length,
                diameter: addFormData.diameter,
                weight: addFormData.weight,
                printingNozelTemp: addFormData.printingNozelTemp,
                printingBedTemp: addFormData.printingBedTemp,
                maxOverHangDistance: addFormData.maxOverHangDistance,
                maxOverHangAngle: addFormData.maxOverHangAngle,
                notes: addFormData.notes,
                userId: user.sub
            };
        }
        var res = await dirtyFetcher("/api/filament/createFilament", {
            method: "post",
            body: JSON.stringify(newFilament)
        });

        if (res.status === 200) {
            event.target.reset()
            notifySuccess('Filament Created! 🎉');
            router.push({
                pathname: '/filaments',
            })

        } else {
            notifyError('Something went wrong on the server! 😩')
        }

    };
    return (
        <div className="border-b border-gray-200 flex flex-col justify-center">
            <form onSubmit={handleAddFormSubmit} className="text-center">
                <div className="py-3 px-6">
                    <label htmlFor="brand" className="text-lg">Brand</label><br />
                    <input type="text" name="brand" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="type" className="text-lg">Type</label><br />
                    <input type="text" name="type" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="color" className="text-lg">Color</label><br />
                    <input type="text" name="color" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="weight" className="text-lg">Weight</label><br />
                    <input type="text" name="weight" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="printingNozelTemp" className="text-lg">Printing Nozel Temp</label><br />
                    <input type="text" name="printingNozelTemp" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="printingBedTemp" className="text-lg">Printing Bed Temp</label><br />
                    <input type="text" name="printingBedTemp" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="maxOverHangDistance" className="text-lg">Max Overhang Distance</label><br />
                    <input type="text" name="maxOverHangDistance" className="border w-72" onChange={handleAddFormChange} />
                </div>
                <div className="py-3 px-6">
                    <label htmlFor="maxOverHangAngle" className="text-lg">Max Overhang Angle</label><br />
                    <input type="text" name="maxOverHangAngle" className="border w-72" onChange={handleAddFormChange} />
                </div>
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