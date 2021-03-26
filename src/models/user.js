const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		mobileNumber: {
			type: String,
			maxlength: 10,
			required: true,
		},
		birthYear: {
			type: Number,
			max: 2000,
			min: 1900,
		},
		skillSet: {
			type: Array,
			default: [],
		},
		is_active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
