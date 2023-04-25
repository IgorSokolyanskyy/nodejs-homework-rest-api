/** @format */

const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  authenticate,
  validationParams,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  validationParams(schemas.verifyMongoIdSchema),
  ctrl.updateFavorit
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

module.exports = router;
