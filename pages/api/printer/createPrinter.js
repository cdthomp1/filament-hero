const mongoose = require('mongoose');
const Printer = require('../models/Printers');
import { MongoClient } from "mongodb";


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default async (req, res) => {
    try {
        const uri = process.env.MONGO_URI;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('filamenttracker')
        const test = database.collection("printers")

        const doc = {
            name: "Astra",
            make: "Creality",
            model: "Ender 3 Pro",
            favColor: "red"
        }

        const result = await test.insertOne(doc);

        /* var printer = req.body
        const newPrinter = new Printer(printer)

        const createdPrinter = await newPrinter.save() */

        var createdPrinter = result.ops.find(op => op._id === result.insertedId)

        res.status(200).json(createdPrinter)

    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }
}