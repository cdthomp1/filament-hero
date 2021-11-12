const mongoose = require('mongoose');

export default ({mongoUri = process.env.MONGO_URI} = {}) => mongoose.connect(
    mongoUri, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
).catch(err => {
    process.exit(1);
});
