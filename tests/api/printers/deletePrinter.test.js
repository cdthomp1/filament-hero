import connectDB from "../../../lib/connectDb";
import deletePrinter from "../../../pages/api/printer/deletePrinter";
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
    printer1 = await new Printer({
        name: 'Some Printer',
        make: "some-type",
        model: "some-colour",
        currentFilament: new mongoose.Types.ObjectId(),
        userId: "123",
    }).save();
});

afterEach(async () => {
    await Printer.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should printer filament', async () => {
    const req = {
        body: JSON.stringify({ id: printer1._id })
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await deletePrinter(req, res);

    const printer = await Printer.findById(printer1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(printer).toBeNull();
});