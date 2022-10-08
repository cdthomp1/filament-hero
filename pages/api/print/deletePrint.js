import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var userId = req.query.userId

        const { id } = req.query;
        const jsonBody = JSON.parse(req.body);

        const updatedPrint = {
            name: jsonBody.name,
            printer: jsonBody.printer,
            stlUrl: jsonBody.stlUrl,
            estPrintTime: jsonBody.estPrintTime,
            actPrintTime: jsonBody.actPrintTime,
            filamentId: jsonBody.filamentId,
            notes: jsonBody.notes,
            status: jsonBody.status,
            partId: jsonBody.partId,
            settingsId: jsonBody.settingsId,
            nozelSize: jsonBody.nozelSize,
            filamentLength: jsonBody.filamentLength,
            weight: jsonBody.weight,
            date: jsonBody.date,
            userId: jsonBody.userId,
            deleted: true
        }

        const updateStatus = await db.collection('prints').updateOne({ "_id": ObjectId(id) }, { $set: updatedPrint });

        // Should probably check if only one was deleted
        if (updateStatus.modifiedCount > 0) {
            res.status(200).json({ message: "Print Successfully Deleted 🎉" });
        } else {
            res.status(500).json({ message: "Something went wrong on the server 😫" });
        }

    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}