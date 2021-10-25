import connectDB from "../../../lib/connectDb";
import createFilament from "../../../pages/api/filament/createFilament";
import Filament from "../../../pages/api/models/Filament";
const mongoose = require('mongoose');

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_TEST = process.env.MONGO_TEST_URI;
    await connectDB();
});

afterEach(async () => {
    await Filament.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should create filament', async () => {
    const filamentObj = {
        type: "some-type",
        color: "some-colour",
        length: 1,
    };
    const req = {
        body: JSON.stringify(filamentObj)
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await createFilament(req, res);
    
    const filament = await Filament.findOne({type: "some-name"});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(filament).toBeDefined();
});
