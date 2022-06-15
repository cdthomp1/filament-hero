import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/connectDb"
import Filament from "../models/Filament";
export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("filamenttracker");
    const jsonBody = JSON.parse(req.body);
    var userId = jsonBody.userId

    let filaments = [];
    const newFilament = new Filament(
        new ObjectId(),
        jsonBody.brand,
        jsonBody.type,
        jsonBody.color,
        jsonBody.diameter,
        jsonBody.weight,
        jsonBody.printingNozelTemp,
        jsonBody.printingBedTemp,
        jsonBody.maxOverHangDistance,
        jsonBody.maxOverHangAngle,
        jsonBody.purchaseDate,
        jsonBody.purchasePrice,
        jsonBody.purchaseLocation,
        jsonBody.notes
    );

    let currentUser = await db.collection('users').findOne({ "userId": userId });

    if (currentUser) {
        console.log(currentUser)
        let currentFilaments = currentUser.filaments
        currentFilaments.push(newFilament);

        await db.collection('users').updateOne({ userId }, {
            $set: { filaments: currentFilaments },
            $currentDate: { lastModified: true }
        })
    } else {
        filaments.push(newFilament);
        await db.collection('users').insertOne({
            userId: userId,
            filaments,
        })
    }



    let data = await db.collection('users').find().toArray()

    res.status(200).json(data);

}
