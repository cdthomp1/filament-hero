import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise;
        const db = client.db("filamenttracker")
        var id = req.query.filamentId
        if (!id) {
            res.status(404).json({ message: "No filament ID provided 😩" })
        }
        const filament = await db.collection('filaments').findOne({ '_id': ObjectId(id) })


        if (filament) {
            res.status(200).json(filament);
        } else {
            res.status(404).json({ message: "Filament not found 😩" })
        }
    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}