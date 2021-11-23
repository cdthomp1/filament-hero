const mongoose = require('mongoose');
const Printer = require('../models/Print')

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