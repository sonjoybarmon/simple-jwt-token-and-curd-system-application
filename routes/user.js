const express = require("express");
const mongoose = require("mongoose");
const { route } = require("../app");
const { loginUser, createUser } = require("../controllers/userHandler");
const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", createUser);

module.exports = router;
