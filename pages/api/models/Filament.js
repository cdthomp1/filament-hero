import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const filamentSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    diameter: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    printingNozelTemp: {
        type: Number,
        default: 0
    },
    printingBedTemp: {
        type: Number,
        default: 0
    },
    maxOverHangDistance: {
        type: Number,
        default: 0
    },
    maxOverHangAngle: {
        type: Number,
        default: 0
    },
    purchaseDate: {
        type: Date,
        default: 0
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    purchaseLocation: {
        type: String,
        default: 0
    },
    generalNotes: {
        type: String,
        default: 0
    },
    picture: {
        type: String,
        default: 0
    },
    userId: {
        type: String
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.filament || mongoose.model('filament', filamentSchema);