/* import Filament from '../models/Filament';
import connectDB from "../../../lib/connectDb";

export default async (req, res) => {
    try {
        await connectDB();
        const { id } = req.query;
        const jsonBody = JSON.parse(req.body);
        const result = await Filament.updateOne({ _id: String(id) }, {
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
            picture: jsonBody.picture
        });
        if (result.n) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Print not found 😩" });
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
} */