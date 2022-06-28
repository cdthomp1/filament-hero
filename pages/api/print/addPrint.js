import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/connectDb"
import Print from "../models/Print";

export default async (req, res) => {
    const client = await clientPromise;
    const db = client.db("filamenttracker");
    const jsonBody = JSON.parse(req.body);
    console.log('sadasdasdasd', jsonBody)
    var userId = jsonBody.userId
    console.log('userId', userId)

    const newPrint = new Print(
        new ObjectId(),
        jsonBody.name,
        jsonBody.printer,
        jsonBody.stlUrl,
        jsonBody.estPrintTime,
        jsonBody.actPrintTime,
        jsonBody.filamentId,
        jsonBody.notes,
        jsonBody.status,
        jsonBody.partId,
        jsonBody.settingsId,
        jsonBody.nozelSize,
        jsonBody.filamentLength,
        jsonBody.weight,
        jsonBody.date,
        jsonBody.userId
    );

    await db.collection('prints').insertOne(newPrint);

    let data = await db.collection('filaments').find({ 'userId': userId }).toArray();

    res.status(200).json(data);
}
