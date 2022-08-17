import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/connectDb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("filamenttracker");
    const jsonBody = JSON.parse(req.body);

    const result = await db
      .collection("printers")
      .remove({ _id: ObjectId(jsonBody.id) }, { justOne: true });
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Printer Successfully Deleted 🎉" });
    } else {
      res.status(404).json({ message: "Printer not found 😩" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on the server 😫" });
  }
};
