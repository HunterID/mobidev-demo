const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
		default: 100,
	},
},
{ timestamps: true },
);

module.exports = model('user', UserSchema);
