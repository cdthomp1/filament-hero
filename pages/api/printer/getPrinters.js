import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var id = req.query.userId
        const allPrinters = await db.collection('printers').find({ userId: id }).toArray()
        res.status(200).json(allPrinters);


    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}