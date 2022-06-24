import React from 'react'

export default function FilamentDetails({ filament }) {
    return (
        <article className="md:gap-8 md:grid md:grid-cols-3">
            <div>
                <div className="flex items-center mb-6 space-x-4">
                    <img className="w-40 h-40 rounded-full" src="https://cdn.sunsh1n3.com/Images/printbed/Blue.jpg" alt="" />
                    <div className="space-y-1 font-medium dark:text-white">
                        {<p>{filament.brand} {filament.color} {filament.type}</p>}
                    </div>
                </div>
            </div>
            <div className="col-span-2 mt-6 md:mt-0">
                <div className="flex flex-col items-start mb-5">
                    {Object.keys(filament).map((key, index) => {
                        if (key === '__v' || key === 'userId' || key === '_id') {
                            return (
                                <></>
                            )
                        }
                        return (
                            <p key={index}>{key}: {filament[key]}</p>
                        )
                    })}
                </div>
            </div>
        </article>
    )
}
