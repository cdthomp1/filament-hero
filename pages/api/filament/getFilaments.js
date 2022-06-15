import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")
        var id = req.query.userId
        const user = await db.collection('users').findOne({ userId: id })
        res.status(200).json(user.filaments);


    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}