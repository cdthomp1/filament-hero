const mongoose = require('mongoose');
const Filament = require('../models/Filament')

const connectDB = async () => {
    console.log(process.env.MONGO_URI)
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

const getFilaments = async (id) => {
    console.log(`id: ${id}`)
    const filaments = await Filament.find({ userId: id })
    return filaments;
}

export default async (req, res) => {
    await connectDB();
    var id = req.query.userId
    console.log(id)
    const allFilaments = await getFilaments(id)
    res.status(200).json(allFilaments)
}