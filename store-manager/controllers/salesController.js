const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();

    return res.status(200).json(sales);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await salesService.getById(id);

    if (sale.message) return res.status(sale.code).json({ message: sale.message });

    return res.status(200).json(sale);
  } catch (err) {
    console.log(err);
  }
};

const createSale = async (req, res) => {
  try {
    const products = req.body;
    const createdSale = await salesService.createSale(products);
    
    if (createdSale.message) {
      return res.status(createdSale.code).json({ message: createdSale.message }); 
    }

    return res.status(201).json(createdSale);
  } catch (err) {
    console.log(err);
  }
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await salesService.updateSale(id, sale);

  if (updatedSale.message) {
    return res.status(updatedSale.code).json({ message: updatedSale.message });
  }
  
  return res.status(200).json(updatedSale);
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
};
