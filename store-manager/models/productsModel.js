const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );

  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  
  if (product.length === 0) return false;

  return product[0];
};

const getByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name = ?;',
    [name],
  );

  if (product.length === 0) return false;

  return product;
};

const createProduct = async (name, quantity) => {
  const [createdProduct] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );
  
  return {
    id: createdProduct.insertId,
    name,
    quantity,
  };
};

const updateProduct = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const [deletedProduct] = await connection.execute(
  'DELETE FROM products WHERE id = ?',
  [id],
  );
  
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  updateProduct,
  deleteProduct,
};
