const express = require("express");
const userValidation = require("../controllers/user/user.validator");
const { addUser, getUser } = require("../controllers/user/user.controller");
const defaultController = require("../controllers/defaultController");

const router = express.Router();

router.get("/", defaultController);

router.post("/addUser", userValidation, addUser);

router.get("/getUser", getUser);

module.exports = router;
