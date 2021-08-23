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

const getFilaments = async () => {
    const filaments = await Filament.find({})
    return filaments;
}

export default async (req, res) => {
    await connectDB();
    const allFilaments = await getFilaments()
    res.status(200).json(allFilaments)
}