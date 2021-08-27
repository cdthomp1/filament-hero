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


    const { id } = JSON.parse(req.body)

    console.log(id)
    const foundFilament = await Filament.findById(id)
    console.log(foundFilament)
    if (foundFilament) {
        await foundFilament.remove()
        res.status(200).json({ message: "Filament Successfully Deleted 🎉" })
    } else {
        res.status(404).json({ message: "Filament not found 😩" })
    }


}