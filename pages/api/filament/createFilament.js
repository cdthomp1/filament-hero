import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/connectDb"
import Filament from "../models/Filament";
export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("filamenttracker");
    const jsonBody = JSON.parse(req.body);

    var userId = jsonBody.userId
    console.log('userId', userId)

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
        jsonBody.notes,
        jsonBody.userId
    );

    await db.collection('filaments').insertOne(newFilament);

    let data = await db.collection('filaments').find({ 'userId': userId }).toArray();

    res.status(200).json(data);

}
