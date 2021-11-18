import Filament from '../models/Filament';
import connectDB from '../../../lib/connectDb';

export default async (req, res) => {
    await connectDB();
    const { id } = JSON.parse(req.body)
    const foundFilament = await Filament.findById(id)
    if (foundFilament) {
        await foundFilament.remove()
        res.status(200).json({ message: "Filament Successfully Deleted 🎉" })
    } else {
        res.status(404).json({ message: "Filament not found 😩" })
    }
}