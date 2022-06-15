import Filament from '../models/Filament';
import connectDB from "../../../lib/connectDb";

export default async (req, res) => {
    await connectDB();
    var id = req.query.userId
    const allFilaments = await Filament.find({ userId: id });
    res.status(200).json(allFilaments);
}