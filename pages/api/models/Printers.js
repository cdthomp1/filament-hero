import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const printerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    bedWidth: {
        type: String,
    },
    bedLength: {
        type: String,
    },
    buildHeight: {
        type: String,
    },
    notes: {
        type: String,
    },
    currentFilamentId: {
        type: String,
    },
    status: {
        type: String,
    },
    picture: {
        type: String,
    },
    currentPrint: {
        type: String,
    },
    lastPrint: {
        type: String,
    },
    userId: {
        type: String
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.printer || mongoose.model('printer', printerSchema);