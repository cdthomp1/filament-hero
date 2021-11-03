import Filament from '../models/Filament';
import connectDB from "../../../lib/connectDb";

export default async (req, res) => {
    await connectDB();
    const jsonBody = JSON.parse(req.body);
    const newFilament = new Filament({
        brand: jsonBody.brand,
        type: jsonBody.type,
        color: jsonBody.color,
        length: jsonBody.length,
        diameter: jsonBody.diameter,
        weight: jsonBody.weight,
        printingNozelTemp: jsonBody.printingNozelTemp,
        printingBedTemp: jsonBody.printingBedTemp,
        maxOverHangDistance: jsonBody.maxOverHangDistance,
        maxOverHangAngle: jsonBody.maxOverHangAngle,
        purchaseDate: jsonBody.purchaseDate,
        purchasePrice: jsonBody.purchasePrice,
        purchaseLocation: jsonBody.purchaseLocation,
        generalNotes: jsonBody.generalNotes,
        picture: jsonBody.picture,
        userId: jsonBody.userId
    });
    const createdFilament = await newFilament.save()
    res.status(200).json(createdFilament)
}