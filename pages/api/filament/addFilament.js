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

    await connectDB();
    console.log(req.body)
    const newFilament = new Filament(req.body)

    const createdFilament = await newFilament.save()


    res.status(200).json(createdFilament)
}