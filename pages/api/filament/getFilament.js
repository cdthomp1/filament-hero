import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise;
        const db = client.db("filamenttracker")
        var id = req.query.id
        if (!id) {
            res.status(404).json({ message: "No user ID provided 😩" })
        }
        const userData = await db.collection('users').findOne({ 'filaments.id': ObjectId(id) })

        let filament = userData.filaments.find(f => f.id.toString() === id)

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