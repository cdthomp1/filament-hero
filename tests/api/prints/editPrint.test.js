import connectDB from "../../../lib/connectDb";
import updatePrint from "../../../pages/api/print/updatePrint";
import Print from "../../../pages/api/models/Print";
const mongoose = require('mongoose');
require("dotenv").config()

let print1;

beforeAll(async () => {
    if (!process.env.MONGO_TEST_URI) {
        console.error("No MONGO_TEST_URI setup")
        process.exit();
    }
    process.env.MONGO_URI = process.env.MONGO_TEST_URI;

    await connectDB();
    print1 = await new Print({
        name: "test print",
        printer: new mongoose.Types.ObjectId().toString(),
        filamentId: new mongoose.Types.ObjectId().toString()
    }).save();
});

afterEach(async () => {
    await Print.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should edit a print', async () => {
    const printObj = {
        name: "updated test print",
        printer: new mongoose.Types.ObjectId().toString(),
        filamentId: new mongoose.Types.ObjectId().toString()
    };
    const req = {
        query: {
            id: print1._id
        },
        body: JSON.stringify(printObj)
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await updatePrint(req, res);

    const print = await Print.findById(print1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(print.name).toBe("updated test print");
});