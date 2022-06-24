import React from 'react'
import Card from './Card'
export default function FilamentGrid(props) {
    const filaments = props.filamentsData
    console.log("filaments", filaments)
    return (
        filaments.map((filament, index) => {
            return (
                <Card key={index} filament={filament} />
            )
        })
    )
}
