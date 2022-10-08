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
            picture: jsonBody.picture,
            deleted: true
        }

        const updateStatus = await db.collection('filaments').updateOne({ "_id": ObjectId(id) }, { $set: updatedFilament });
        if (updateStatus.modifiedCount > 0) {
            res.status(200).json({ message: "Filament Successfully Deleted 🎉" });
        } else {
            res.status(500).json({ message: "Something went wrong on the server 😫" });
        }

    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}