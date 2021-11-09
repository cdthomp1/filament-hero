const mongoose = require('mongoose');
const Print = require('../models/Print')

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

const getPrints = async (id) => {
    const prints = await Print.find({ userId: id }).populate('printer').populate('filamentId')
    return prints;
}

export default async (req, res) => {
    await connectDB();
    var id = req.query.userId
    const allPrints = await getPrints(id)
    console.log(allPrints)
    res.status(200).json(allPrints)
}