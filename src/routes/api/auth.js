/** @format */

const express = require("express");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody } = require("../../middlewares");
const router = express.Router();

// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// singin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
