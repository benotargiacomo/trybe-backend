const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT s.id AS saleId, s.date, p.quantity, p.product_id
    FROM sales_products AS p
    INNER JOIN sales AS s 
    ON p.sale_id = s.id;`,
  );

  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, p.product_id, p.quantity 
    FROM sales_products AS p
    INNER JOIN sales AS s 
    ON p.sale_id = s.id
    WHERE id = ?;`,
    [id],
  );
  
  if (sale.length === 0) return false;

  return sale;
};

const productsIdCheck = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  
  if (product.length === 0) return false;

  return true;
};

const createSaleId = async () => {
  const [createdSaleId] = await connection.execute(
    'INSERT INTO sales (date) VALUES (current_date());',
  );

  return createdSaleId.insertId;
};

const createSale = async (products) => {
  const saleId = await createSaleId();

  products.forEach(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [saleId, productId, quantity],
    );
  });

  return {
    id: saleId,
    itemsSold: products,
  };
};

const updateSale = async (id, sale) => {
  const { product_id: productId, quantity } = sale;
  
  await connection.execute(
    `UPDATE sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?;`,
    [productId, quantity, id],
  );

  return {
    saleId: id,
    itemUpdated: [sale],
  };
};

module.exports = {
  getAll,
  getById,
  productsIdCheck,
  createSaleId,
  createSale,
  updateSale,
};