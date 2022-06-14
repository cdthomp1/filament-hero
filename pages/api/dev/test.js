import { ObjectId } from "mongodb"
import clientPromise from "../../../lib/connectDb"

export default async (req, res) => {
    try {

        const client = await clientPromise
        const db = client.db("filamenttracker")

        /*       await db.collection('users').insertOne({
                  name: 'DEV TEST ACCOUNT 1',
                  filaments: [],
                  printers: [],
                  prints: []
              }) */
        try {
            await db.collection('users').updateOne({ "_id": ObjectId('62a811e38cfb0f2e4a018741') }, {
                $set: { 'pictures': [] },
                $currentDate: { lastModified: true }
            })

        } catch (error) {
            console.log(error)
        }


        let data = await db.collection('users').find().toArray()

        res.status(200).json(data);

    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}