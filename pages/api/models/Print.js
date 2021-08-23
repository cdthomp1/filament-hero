import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const printSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    filament: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    weight: {
        type: Number,
        default: 0
    },
    user: {
        type: String
    }
}, 
{
    timestamps: true,
})

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.print || mongoose.model('print', printSchema);