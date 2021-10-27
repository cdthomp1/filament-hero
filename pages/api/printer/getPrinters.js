const mongoose = require('mongoose');
const Printer = require('../models/Printers')
const Filament = require('../models/Filament')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connect: ${conn.connection.host}`)

    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

const getPrinters = async (id) => {
    const printers = await Printer.find({ userId: id }).populate('currentFilament')
    return printers
}

export default async (req, res) => {
    await connectDB();
    var id = req.query.userId
    const allPrinters = await getPrinters(id)
    res.status(200).json(allPrinters)
}