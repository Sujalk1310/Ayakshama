const { Schema, mongoose } = require('mongoose');

const notificaitonUserSchema = new Schema({
    message: {
        type: String,
        null: false,
        trim: true
    },
}, {timestamps: true})

const NotificationUser = mongoose.model('NotificationUser', notificaitonUserSchema);

module.exports = NotificationUser;