const { Schema, mongoose } = require('mongoose');

const heartVitalSchema = new Schema({
    age: {
        type: Number,
        null: false,
        trim: true
    },
    sex: {
        type: Number,
        null: false,
        trim: true
    },
    cp: {
        type: Number,
        null: false,
        trim: true
    },
    tresbps: {
        type: Number,
        null: false,
        trim: true
    },
    chol: {
        type: Number,
        null: false,
        trim: true
    },
    fbs: {
        type: Number,
        null: false,
        trim: true
    },
    restecg: {
        type: Number,
        null: false,
        trim: true
    },
    thalach: {
        type: Number,
        null: false,
        trim: true
    },
    exang: {
        type: Number,
        null: false,
        trim: true
    },
    oldpeak: {
        type: Number,
        null: false,
        trim: true
    },
    slope: {
        type: Number,
        null: false,
        trim: true
    },
    ca: {
        type: Number,
        null: false,
        trim: true
    },
    thal: {
        type: Number,
        null: false,
        trim: true
    },
}, {timestamps: true})

const HeartVital = mongoose.model('HeartVital', heartVitalSchema);

module.exports = HeartVital;