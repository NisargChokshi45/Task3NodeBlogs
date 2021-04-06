const User = require("../../models/user");
const errorFunction = require("../../utils/errorFunction");
const securePassword = require("./../../utils/securePassword");

const addUser = async (req, res, next) => {
	try {
		const existingUser = await User.findOne({
			email: req.body.email,
		}).lean(true);
		if (existingUser) {
			res.status(403);
			return res.json(errorFunction(true, "User Already Exists"));
		} else {
			const hashedPassword = await securePassword(req.body.password);
			const newUser = await User.create({
				userName: req.body.userName,
				email: req.body.email,
				password: hashedPassword,
				mobileNumber: req.body.mobileNumber,
				birthYear: req.body.birthYear,
				skillSet: req.body.skillSet,
				is_active: req.body.is_active,
			});
			if (newUser) {
				res.status(201);
				return res.json(
					errorFunction(false, "User Created", newUser)
				);
			} else {
				res.status(403);
				return res.json(errorFunction(true, "Error Creating User"));
			}
		}
	} catch (error) {
		res.status(400);
		console.log(error);
		return res.json(errorFunction(true, "Error Adding user"));
	}
};

const getUsers = async (req, res, next) => {
	try {
		const allUsers = await User.find();
		if (allUsers) {
			res.status(201);
			return res.json(
				errorFunction(false, "Sending all users", allUsers)
			);
		} else {
			res.status(403);
			return res.json(errorFunction(true, "Error getting Users"));
		}
	} catch (error) {
		res.status(400);
		return res.json(errorFunction(true, "Error Adding user"));
	}
};

module.exports = { addUser, getUsers };
