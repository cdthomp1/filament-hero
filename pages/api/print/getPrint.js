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

export default async (req, res) => {


    const id = req.query.id

    const foundPrint = await Print.findById(id)

    if (foundPrint) {
        res.status(200).json(foundPrint)
    } else {
        res.status(404).json({ message: "Print not found 😩" })
    }


}