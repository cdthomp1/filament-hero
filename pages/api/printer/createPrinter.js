/* const mongoose = require('mongoose');
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
        process.exit(1);
    }
}

export default async (req, res) => {
    try {
        await connectDB();
        const newPrinter = new Printer(JSON.parse(req.body))

        const createdPrinter = await newPrinter.save()


        res.status(200).json(createdPrinter)

    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack })
    }
} */