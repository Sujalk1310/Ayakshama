const { Schema, mongoose } = require('mongoose');

const recommendationsSchema = new Schema({
    message: {
        type: String,
        null: false,
        trim: true
    },
}, {timestamps: true})

const Recommendations = mongoose.model('Recommendations', recommendationsSchema);

module.exports = Recommendations;