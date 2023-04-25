/** @format */

const express = require("express");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");
const router = express.Router();

// singup
router.post(
  "/register",
  authenticate,
  validateBody(schemas.registerSchema),
  ctrl.register
);

// singin
router.post(
  "/login",
  authenticate,
  validateBody(schemas.loginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
