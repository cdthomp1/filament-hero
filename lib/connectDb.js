const mongoose = require('mongoose');

export default ({mongoUri = process.env.MONGO_URI} = {}) => mongoose.connect(
    mongoUri, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
).catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
