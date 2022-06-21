import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var id = req.query.userId
        //var id = 'google-oauth2|113159839716783009469'
        if (id) {
            const allPrints = await db.collection('prints').find({ userId: id }).toArray();

            const mappedPrints = await Promise.all(allPrints.map(async (print) => {
                const tempFilament = await db.collection('filaments').findOne({ "_id": ObjectId(print.filamentId.toString()) });
                const tempPrinter = await db.collection('printers').findOne({ "_id": ObjectId(print.printer.toString()) })
                return { ...print, filament: tempFilament, printer: tempPrinter };
            }))
            res.status(200).json(mappedPrints);
        } else {
            res.status(400).json({ message: "User ID not found 😩" })
        }
    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}