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
        /*         try {
                    await db.collection('filaments').updateOne({ "_id": ObjectId('62a811e38cfb0f2e4a018741') }, {
                        $set: { 'pictures': [] },
                        $currentDate: { lastModified: true }
                    })
        
                } catch (error) {
                    console.log(error)
                } */


        let data = await db.collection('filaments').updateOne({ userId: 'google-oauth2|103405250983681452179', "_id": ObjectId("62999a12f524c4000970cb18") }, {
            $set: {
                testProp: "I AM A TEST"
            }
        }, { upsert: false })

        res.status(200).json(data);

    } catch (e) {
        console.error(e)
        res.status(200).json({ isConnected: false });
    }
}