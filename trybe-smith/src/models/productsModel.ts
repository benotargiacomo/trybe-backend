import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { AddProduct } from '../interfaces/interfaces';
import connection from './connection';

const addProduct = async (body: AddProduct) => {
  const { name, amount } = body;

  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
    [name, amount],
  );
  
  const item = { item: {
    id: result.insertId,
    name,
    amount,
  } };

  return item;
};

const listProducts = async () => {
  const [result] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM Trybesmith.Products',
  );

  return result;
};

export default {
  addProduct,
  listProducts,
};