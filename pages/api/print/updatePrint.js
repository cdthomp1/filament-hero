const mongoose = require('mongoose');
const Print = require('../models/Print');

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
        const { name, description, filament, duration, weight, user} = req.body

        const print = await Print.findById(id)

        if (print) {

            print.name = name
            print.description = description
            print.filament = filament
            print.duration = duration
            print.weight = weight
            print.user = user
            

            const updatedPrint = await print.save()
            res.status(200).json( updatedPrint)
        } else {
            res.status(404).json({ message: "Print not found 😩" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })

    }


}