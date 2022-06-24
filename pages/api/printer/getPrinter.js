import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var id = req.query.userId
        const allPrints = await db.collection('printers').find({ userId: id }).toArray();

        const mappedPrinters = await Promise.all(allPrints.map(async (printer) => {
            const tempFilament = await db.collection('currentFilament').findOne({ "_id": ObjectId(printer.filamentId.toString()) });
            const tempPrinter = await db.collection('prints').findOne({ "_id": ObjectId(printer.currentPrint.toString()) })
            return { ...printer, currentFilament: tempFilament, currentPrint: tempPrinter };
        }))
        res.status(200).json(mappedPrinters);
    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}