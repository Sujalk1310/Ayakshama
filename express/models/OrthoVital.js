const { Schema, mongoose } = require('mongoose');

const orthoVitalSchema = new Schema({
    desc: {
        type: String,
        null: false,
        trim: true
    },
    img: {
        type: String,
        trim: true
    }
}, {timestamps: true})

const OrthoVital = mongoose.model('OrthoVital', orthoVitalSchema);

module.exports = OrthoVital;