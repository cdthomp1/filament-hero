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
        <div className="">
            {printsData.length > 0 ?
                <div class="overflow-x-auto">
                    <table class="min-w-max w-full table-auto ">
                        <thead>
                            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">Name</th>
                                <th class="py-3 px-6 text-left">Printer</th>
                                <th class="py-3 px-6 text-center">EST. Print<br />Time</th>
                                <th class="py-3 px-6 text-center">ACT. Print Time</th>
                                <th class="py-3 px-6 text-center">Status</th>
                                <th class="py-3 px-6 text-center">Filament</th>
                                <th class="py-3 px-6 text-center">Settings</th>
                                <th class="py-3 px-6 text-center">Part</th>
                                <th class="py-3 px-6 text-center">Nozzle Size</th>
                                <th class="py-3 px-6 text-center">Weight</th>
                                <th class="py-3 px-6 text-center">Date</th>
                                <th class="py-3 px-6 text-center">Notes</th>
                                <th class="py-3 px-6 text-center"></th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 text-sm font-light">
                            {printsData.map((print, index) => {
                                return (
                                    <Fragment key={index}> {editPrintId !== print._id ? (
                                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.name}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.printer}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.estPrintTime}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.actPrintTime}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.status}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.filamentId}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.settingsId}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.partId}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.nozelSize}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.weight}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.date}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <span class="font-medium">{print.notes}</span>
                                                </div>
                                            </td>
                                            <td class="py-3 px-6 text-center">
                                                <div class="flex item-center justify-center">
                                                    <button><FontAwesomeIcon className="m-1 cursor-pointer hover:text-purple-500" icon={faSave} /></button>
                                                    <button type="button">
                                                        <FontAwesomeIcon className="m-1 cursor-pointer hover:text-purple-500" icon={faWindowClose} />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>

                                    ) :
                                        (<div key={index} className="grid grid-cols-6 gap-x-1">
                                            <p>a</p>
                                        </div>)
                                    } </Fragment>)
                            })}
                            <div className="mt-4"><PrintForm user={user} onFormAdd={handleFormUpdate} filamentsData={filamentsData} /></div>
                        </tbody>
                    </table>
                </div>
                :
                <><p className="m-4">Add a Print!</p><PrintForm user={user} onFormAdd={handleFormUpdate} filamentsData={filamentsData} /></>}

        </div>
    )
}