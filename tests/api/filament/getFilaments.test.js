import connectDB from "../../../lib/connectDb";
import getFilaments from "../../../pages/api/filament/getFilaments";
import Filament from "../../../pages/api/models/Filament";
const mongoose = require('mongoose');

let filament1;

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_TEST = process.env.MONGO_TEST_URI;
    await connectDB();
    filament1 = await (new Filament({
        type: "some-type", 
        color: "some-colour", 
        length: 1,
        userId: "123",
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
            userId: "123"
        },
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await getFilaments(req, res);
    
    const filament = await Filament.findById(filament1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    const result = res.json.mock.calls[0][0];
    expect(result.length).toBe(1);
    expect(String(result[0]._id)).toBe(String(filament1._id));
});
