const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsService.getById(id);

    if (product.message) {
      return res.status(product.code).json({ message: product.message });
    } 

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const createdProduct = await productsService.createProduct(name, quantity);

    if (createdProduct.message) {
      return res.status(createdProduct.code).json({ message: createdProduct.message }); 
    }

    res.status(201).json(createdProduct);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updatedProduct = await productsService.updateProduct(id, name, quantity);

    if (updatedProduct.message) {
      return res.status(updatedProduct.code).json({ message: updatedProduct.message });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productsService.deleteProduct(id);

    if (deletedProduct.message) {
      return res.status(deletedProduct.code).json({ message: deletedProduct.message });
    }

    res.status(200).json(deletedProduct);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};