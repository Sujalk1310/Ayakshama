const { Schema, mongoose } = require('mongoose');

const generalVitalSchema = new Schema({
    desc: {
        type: String,
        null: false,
        trim: true
    },
}, {timestamps: true})

const GeneralVital = mongoose.model('GeneralVital', generalVitalSchema);

module.exports = GeneralVital;