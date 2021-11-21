import connectDB from "../../../lib/connectDb";
import getPrinter from "../../../pages/api/printer/getPrinter";
import Printer from "../../../pages/api/models/Printer";
const mongoose = require('mongoose');
require("dotenv").config()

let printer1;

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_URI = process.env.MONGO_TEST_URI;

    await connectDB();
    printer1 = await (new Printer({
        name: 'Some Printer',
        make: "some-type", 
        model: "some-colour", 
        currentFilament: new mongoose.Types.ObjectId(),
        userId: "123",
    })).save();
});

afterEach(async () => {
    await Printer.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should get filament', async () => {
    const req = {
        query: {
            id: printer1._id
        },
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);
    await getPrinter(req, res);


    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(String(res.json.mock.calls[0][0]._id)).toBe(String(printer1._id));
});