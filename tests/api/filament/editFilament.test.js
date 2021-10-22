import connectDB from "../../../lib/connectDb";
import editFilament from "../../../pages/api/filament/editFilament";
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
    filament1 = await new Filament({
        type: "some-type", 
        color: "some-colour", 
        length: 1,
    }).save();
});

afterEach(async () => {
    await Filament.deleteMany();
});

afterAll(() => {
    mongoose.disconnect();
})

test('should edit filament', async () => {
    const filamentObj = {
        type: "some-new-type",
        color: "some-new-colour",
        length: 1,
    };
    const req = {
        query: {
            id: filament1._id
        },
        body: JSON.stringify(filamentObj)
    };
    const res = {
        status: jest.fn(),
        json: jest.fn()
    };
    res.status.mockReturnValueOnce(res);

    await editFilament(req, res);
    
    const filament = await Filament.findById(filament1._id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls.length).toBe(1);
    expect(filament.type).toBe("some-new-type");
});
