const mongoose = require('mongoose');
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

export default async (req, res) => {
    try {
        const { user } = await getSession(req, res);

        await connectDB();
        const { id } = req.query
        const { type, color, length, diameter, weight } = req.body

        const filament = await Filament.findById(id)

        if (filament) {

            filament.type = type
            filament.color = color
            filament.length = length
            filament.diameter = diameter
            filament.weight = weight


            const updatedFilament = await filament.save()
            res.status(200).json(updatedFilament)
        } else {
            res.status(404).json({ message: "Filament not found 😩" })
        }
    }
    catch (error) {
        res.status(500).json({ message: error })

    }


}