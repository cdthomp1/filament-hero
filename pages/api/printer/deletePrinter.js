const mongoose = require('mongoose');
const Printer = require('../models/Printers')

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


    const { id } = JSON.parse(req.body)

    const foundPrinter = await Printer.findById(id)

    if (foundPrinter) {
        await foundPrinter.remove()
        res.status(200).json({ message: "Printer Successfully Deleted 🎉" })
    } else {
        res.status(404).json({ message: "Printer not found 😩" })
    }


}