import createPrinter from "../../../pages/api/printer/createPrinter";
import Printer from "../../../pages/api/models/Printer";
import connectDB from "../../../lib/connectDb";
const mongoose = require('mongoose');
require("dotenv").config()

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_URI = process.env.MONGO_TEST_URI;
    await connectDB();

});

afterEach(async () => {
    await Printer.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should create filament', async () => {
    const printerObj = {
        name: 'Some Printer',
        make: "some-type",
        model: "some-colour",
        currentFilament: new mongoose.Types.ObjectId(),
        userId: "123",
    };
    const req = {
        body: JSON.stringify(printerObj)
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await createPrinter(req, res);

    const printer = await Printer.findOne({ make: "some-type" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(printer).toBeDefined();
});