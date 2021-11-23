import connectDB from "../../../lib/connectDb";
import getPrinters from "../../../pages/api/printer/getPrinters";
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

test('should get printers', async () => {
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

    await getPrinters(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    const result = res.json.mock.calls[0][0];
    expect(result.length).toBe(1);
    expect(String(result[0]._id)).toBe(String(printer1._id));
});