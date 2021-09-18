const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const usersChema = new Schema({
    surname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    followers: {
        type: [Types.ObjectId],
        default: [],
    },
    friends: {
        type: [Types.ObjectId],
        default: [],
    },
},
    { timestamps: true }
);


module.exports = model("users", usersChema)