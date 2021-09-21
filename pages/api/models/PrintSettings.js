import mongoose from 'mongoose';
mongoose.Promise = global.Promise;


const printSettings = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    filamentId: {
        type: String,
        required: true
    },
    filamentName: {
        type: String,
        required: true
    },
    quality: {
        layerHeight: {
            type: Number,
            required: false
        },
        initialLayerHeight: {
            type: Number,
            required: false
        },
        lineWidth: {
            type: Number,
            required: false
        },
        wallLineWidth: {
            type: Number,
            required: false
        },
        outwerWallLineWidth: {
            type: Number,
            required: false
        },
        innerWallsLineWidth: {
            type: Number,
            required: false
        },
        topBottomeLineWidth: {
            type: Number,
            required: false
        },
        infillLineWidth: {
            type: Number,
            required: false
        },
        skirtBrimLineWidth: {
            type: Number,
            required: false
        },
        initialLayerLineWidth: {
            type: Number,
            required: false
        }
    }
},
    {
        timestamps: true,
    })

// Do I have a model already? Make a new one if I don't
module.exports = mongoose.models.printSettings || mongoose.model('printSetings', printSettings);