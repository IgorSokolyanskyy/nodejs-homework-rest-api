/** @format */

const { Contact } = require("../models/contact");
const { ctrlWrapper, httpError } = require("../helpers");

const getAll = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  })
    .then((data) => {
      if (favorite === "false" || favorite === "true") {
        return data.filter((item) => {
          return item.favorite.toString() === favorite;
        });
      }
      return data;
    })
    .populate("owner", "name email");
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw httpError(404, `Contact with id:${contactId} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, `Contact with id:${contactId} not found`);
  }
  res.json(result);
};

const updateFavorit = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw httpError(404, `Contact with id:${contactId} not found`);
  }
  res.json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw httpError(`Contact with id=${contactId} not found`);
  }
  res.json({
    message: "contact deleted",
    data: result,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorit: ctrlWrapper(updateFavorit),
  removeById: ctrlWrapper(removeById),
};
