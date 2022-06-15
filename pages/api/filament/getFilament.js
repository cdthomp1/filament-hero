/* import Filament from '../models/Filament';
import connectDB from  "../../../lib/connectDb";

export default async (req, res) => {
    await connectDB();
    const id = req.query.id;
    const foundFilament = await Filament.findById(id);
    if (foundFilament) {
        res.status(200).json(foundFilament)
    } else {
        res.status(404).json({ message: "Filament not found 😩" })
    }
} */

import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var id = req.query.id
        const userData = await db.collection('users').findOne({ 'filaments.id': ObjectId(id) })

        let filament = userData.filaments.find(f => f.id.toString() === id)

        res.status(200).json(filament);


    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}