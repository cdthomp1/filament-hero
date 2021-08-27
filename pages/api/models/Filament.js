import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const filamentSchema = mongoose.Schema({
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
    userId: {
        type: String
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.filament || mongoose.model('filament', filamentSchema);