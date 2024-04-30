const { Schema, mongoose } = require('mongoose');

const keySchema = new Schema({
    id: {
        type: Number
    },
    key: {
        type: String
    }
})

const Key = mongoose.model('Key', keySchema);

module.exports = Key;