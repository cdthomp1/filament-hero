/* const mongoose = require('mongoose');
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
    try {

        await connectDB();
        const { id } = req.query
        const { name, make, model, bedWidth, bedLength, buildHeight, description, currentFilament, status, notes } = JSON.parse(req.body)
        const printer = await Printer.findById(id)

        if (printer) {

            printer.name = name,
                printer.make = make,
                printer.model = model,
                printer.bedWidth = bedWidth,
                printer.bedLength = bedLength,
                printer.buildHeight = buildHeight,
                printer.description = description,
                printer.currentFilament = `${currentFilament}`
            printer.status = status,
                // image = image,
                printer.notes = notes

            const updatedPrinter = await printer.save()
            res.status(200).json({ message: 'All Done!' })
        } else {
            res.status(404).json({ message: "Printer not found 😩" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })

    }


} */