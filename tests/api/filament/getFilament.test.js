import connectDB from "../../../lib/connectDb";
import getFilament from "../../../pages/api/filament/getFilament";
import Filament from "../../../pages/api/models/Filament";
const mongoose = require('mongoose');
require("dotenv").config()

let filament1;

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_URI = process.env.MONGO_TEST_URI;

    await connectDB();
    filament1 = await (new Filament({
        brand: 'Test',
        type: "some-type", 
        color: "some-colour", 
        length: 1,
    })).save();
});

afterEach(async () => {
    await Filament.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should get filament', async () => {
    const req = {
        query: {
            id: filament1._id
        },
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);
    await getFilament(req, res);

    const filament = await Filament.findById(filament1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(String(res.json.mock.calls[0][0]._id)).toBe(String(filament1._id));
});