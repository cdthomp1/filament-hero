import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        const userId = req.query.userId
        console.log(userId)
        if (userId) {
            const allPrints = await db.collection('prints').find({ 'userId': userId }).toArray();

            const mappedPrints = await Promise.all(allPrints.map(async (print) => {
                console.log(print)
                const tempFilament = await db.collection('filaments').findOne({ "_id": print.filamentId });
                const tempPrinter = await db.collection('printers').findOne({
                    "_id": print.printer
                })
                return { ...print, filament: tempFilament, printer: tempPrinter };
            }))
            const filteredPrints = mappedPrints.filter(p => !p.deleted);

            res.status(200).json(filteredPrints);
        } else {
            res.status(400).json({ message: "User ID not found 😩" })
        }
    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}