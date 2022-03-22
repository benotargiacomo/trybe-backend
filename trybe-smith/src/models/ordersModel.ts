import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from './connection';

const addOrder = async (userId: number, products: number[]) => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
    [userId],
  );
  const { insertId: orderId } = result;

  products.forEach(async (product) => {
    await connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, product],
    );
  });

  return { order: { userId, products } };
};

const getOrderById = async (id: number) => {
  const [result] = await connection.execute<RowDataPacket[]>(
    `SELECT o.userId, p.id FROM Trybesmith.Orders o 
    INNER JOIN Trybesmith.Products p
    ON p.orderId = o.id WHERE o.id = ?`,
    [id],
  );
  
  if (result.length === 0) return false;

  const products: number[] = result.map((product) => product.id);
  const { userId } = result[0];
  
  return { id, userId, products };
};

const getOrders = async () => {
  const [result] = await connection.execute<RowDataPacket[]>(
    `SELECT o.id, o.userId, p.id AS products FROM Trybesmith.Orders o
    INNER JOIN Trybesmith.Products p
    ON p.orderId = o.id`,
  );

  if (result.length === 0) return false;
  
  return result;
};

export default {
  addOrder,
  getOrderById,
  getOrders,
};