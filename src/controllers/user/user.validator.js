const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = joi.object({
	userName: joi.string().alphanum().min(3).max(25).trim(true).required(),
	email: joi.string().email().trim(true).required(),
	password: joi.string().min(8).trim(true).required(),
	mobileNumber: joi
		.string()
		.length(10)
		.pattern(/[6-9]{1}[0-9]{9}/)
		.required(),
	birthYear: joi.number().integer().min(1920).max(2000),
	skillSet: joi
		.array()
		.items(joi.string().alphanum().trim(true))
		.default([]),
	is_active: joi.boolean().default(true),
});

const userValidation = async (req, res, next) => {
	const payload = {
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password,
		mobileNumber: req.body.mobileNumber,
		birthYear: req.body.birthYear,
		skillSet: req.body.skillSet,
		is_active: req.body.is_active,
	};

	const { error } = validation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};

module.exports = userValidation;
