import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var userId = req.query.userId

        const { id } = req.query;
        const jsonBody = JSON.parse(req.body);

        const updatedFilament = {
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
        }

        await db.collection('filaments').updateOne({ "_id": ObjectId(id) }, { $set: updatedFilament });

        res.status(200).json({});

    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}