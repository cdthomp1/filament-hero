const mongoose = require('mongoose');
const Printer = require('../models/Printers');

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

        await connectDB();
        const { id } = req.query
        const { name } = JSON.parse(req.body)
        console.log(name)
        const printer = await Printer.findById(id)
        console.log(printer)

        if (printer) {

            // printer.name = name


            const updatedPrinter = await printer.save()
            console.log(updatedPrinter)
            res.status(200).json(updatedPrinter)
        } else {
            res.status(404).json({ message: "Printer not found 😩" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })

    }


}