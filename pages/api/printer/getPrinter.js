const mongoose = require('mongoose');
const Printer = require('../models/Printers')

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

export default async (req, res) => {

    try {
        const id = req.query.id
    
        const foundPrinter = await Printer.findById(id)

        if (foundPrinter) {
            res.status(200).json(foundPrinter)
        } else {
            res.status(404).json({ message: "Printer not found 😩" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }



}