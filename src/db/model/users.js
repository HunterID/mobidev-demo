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
},
{ timestamps: true },
);

module.exports = model('user', UserSchema);
