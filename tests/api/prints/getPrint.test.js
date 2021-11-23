import connectDB from "../../../lib/connectDb";
import getPrint from "../../../pages/api/print/getPrint";
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
    print1 = await (new Print({
        name: "test print",
        printer: new mongoose.Types.ObjectId().toString(),
        filamentId: new mongoose.Types.ObjectId().toString()
    })).save();
});

afterEach(async () => {
    await Print.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should get print', async () => {
    const req = {
        query: {
            id: print1._id
        },
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);
    await getPrint(req, res);


    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(String(res.json.mock.calls[0][0]._id)).toBe(String(print1._id));
});