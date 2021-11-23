import connectDB from "../../../lib/connectDb";
import getPrints from "../../../pages/api/print/getPrints";
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
0
    print1 = await new Print({
        name: "test print",
        printer: new mongoose.Types.ObjectId().toString(),
        filamentId: new mongoose.Types.ObjectId().toString(),
        userId: '123'
    }).save();
});

afterEach(async () => {
    await Print.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should get prints', async () => {
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

    await getPrints(req, res);

    //const print = await Print.findById(print1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    const result = res.json.mock.calls[0][0];
    expect(result.length).toBe(1);
    expect(String(result[0]._id)).toBe(String(print1._id));
});