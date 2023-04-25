/** @format */

const { Contact } = require("../models/contact");
const { ctrlWrapper, httpError } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json(result);
  } else {
    const result = await Contact.find({ owner }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res.json(result);
  }
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
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ name, email, phone, owner });

  res.status(201).json(newContact);
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
