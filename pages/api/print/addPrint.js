/* const mongoose = require('mongoose');
const Print = require('../models/Print');
const Printer = require('../models/Printers');

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

    await connectDB();
    const newPrint = new Print(JSON.parse(req.body))


    const createdPrint = await newPrint.save()


    res.status(200).json(createdPrint)
} */