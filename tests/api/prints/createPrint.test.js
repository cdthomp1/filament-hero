import addPrint from "../../../pages/api/print/addPrint";
import Print from "../../../pages/api/models/Print";

import connectDB from "../../../lib/connectDb";
const mongoose = require('mongoose');
require("dotenv").config()
let filament;
let printer;

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_URI = process.env.MONGO_TEST_URI;
    await connectDB();

});

afterEach(async () => {
    await Print.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should create a print', async () => {
    const printObj = {
        name: "test print",
        printer: new mongoose.Types.ObjectId().toString(),
        filamentId: new mongoose.Types.ObjectId().toString()
    };
    const req = {
        body: JSON.stringify(printObj)
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await addPrint(req, res);

    const print = await Print.findOne({ name: "test print" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(print).toBeDefined();
});