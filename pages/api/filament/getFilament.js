import Filament from '../models/Filament';
import connectDB from  "../../../lib/connectDb";

export default async (req, res) => {
    await connectDB();
    const id = req.query.id;
    const foundFilament = await Filament.findById(id);
    if (foundFilament) {
        res.status(200).json(foundFilament)
    } else {
        res.status(404).json({ message: "Filament not found 😩" })
    }
}