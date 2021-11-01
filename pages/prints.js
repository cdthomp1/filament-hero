import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumpster, faEdit, faSave, faWindowClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import PrintsTable from '../components/prints/PrintsTable'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


export default withPageAuthRequired(function print({ user }) {

    return (
        <div>
            <h1>All Prints</h1>

            {/* <div class="overflow-x-auto">
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
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-3 px-6 text-left whitespace-nowrap">
                                <div class="flex items-center">
                                    <span class="font-medium">PRINT NAME</span>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-left">
                                <div class="flex items-center">
                                    <div class="mr-2">
                                        Ender 3 Pro<br />
                                        Creality
                                    </div>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                    <p>5</p>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex items-center justify-center">
                                    <p>5</p>
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    PLA
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    LINK TO SETTINGS
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    Link to Part
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    0.4 mm
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    1 Gram
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    {Date.now()}
                                </div>
                            </td>
                            <td class="py-3 px-6 text-center">
                                <div class="flex item-center justify-center">
                                    Watch for bed lift
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

                    </tbody>
                </table>
            </div> */}
            <PrintsTable user={user} />

        </div>

    )
})
