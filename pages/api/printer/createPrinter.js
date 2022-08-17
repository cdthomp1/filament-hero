import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/connectDb";
import Printer from "../models/Printer";
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("filamenttracker");
    const jsonBody = JSON.parse(req.body);

    var userId = jsonBody.userId;
    console.log("userId", userId);

    const newPrinter = new Printer(
      new ObjectId(),
      jsonBody.name,
      jsonBody.make,
      jsonBody.model,
      jsonBody.bedWidth,
      jsonBody.bedLength,
      jsonBody.buildHeight,
      jsonBody.description,
      jsonBody.status,
      jsonBody.notes,
      jsonBody.userId
      // jsonBody.image
    );

    let data = await db.collection("printers").insertOne(newPrinter);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};
