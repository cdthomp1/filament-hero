import clientPromise from "../../../lib/connectDb"
import { ObjectId } from "mongodb"


export default async (req, res) => {

    try {
        const client = await clientPromise;
        const db = client.db("filamenttracker");

        var id = req.query.printId
        if (!id) {
            res.status(404).json({ message: "No print ID provided 😩" });
        }

        const print = await db.collection('prints').findOne({ '_id': ObjectId(id) });

        if (print) {
            res.status(200).json(print);
        } else {
            res.status(404).json({ message: "Print not found 😩" });
        }

    } catch (error) {
        console.error(e)
        res.status(500).json({ isConnected: false });
    }
}