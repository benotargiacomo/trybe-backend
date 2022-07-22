const SalesService = require('../service/sales.service');

const create = async (req, res, next) => {
  try {
    const result = await SalesService.create(req.body);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await SalesService.findAll(req.user.id);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SalesService.findOne(id);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id: saleId, status } = req.body;
    const { id: userId } = req.user;

    const result = await SalesService.update(userId, saleId, status);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { 
  create,
  findAll,
  findOne,
  update,
};
