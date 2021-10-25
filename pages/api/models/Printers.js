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
        default: ''
    },
    bedLength: {
        type: String,
        default: ''
    },
    buildHeight: {
        type: String,
        default: ''
    },
    notes: {
        type: String,
        default: ''
    },
    currentFilamentId: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    currentPrint: {
        type: String,
        default: ''
    },
    lastPrint: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.printer || mongoose.model('printer', printerSchema);