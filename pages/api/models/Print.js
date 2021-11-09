import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const printSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    printer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'printer',
        required: true
    },
    stlUrl: {
        type: String,
    },
    estPrintTime: {
        type: Number,
    },
    actPrintTime: {
        type: String,
    },
    filamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'filament',
        required: true
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
    },
    partId: {
        type: String,
    },
    settingsId: {
        type: String,
    },
    nozelSize: {
        type: Number,
    },
    filamentLength: {
        type: Number,
    },
    weight: {
        type: String,
    },
    date: {
        type: Date,
    },
    userId: {
        type: String
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.print || mongoose.model('print', printSchema);