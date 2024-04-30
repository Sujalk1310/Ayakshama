const { Schema, mongoose } = require('mongoose');

const gastroVitalSchema = new Schema({
    desc: {
        type: String,
        null: false,
        trim: true
    },
}, {timestamps: true})

const GastroVital = mongoose.model('GastroVital', gastroVitalSchema);

module.exports = GastroVital;