import { RowDataPacket } from 'mysql2';
import { Login } from '../interfaces/interfaces';
import connection from './connection';

const validateSignIn = async (body: Login) => {
  const { username, password } = body;

  const [[result]] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM Trybesmith.Users WHERE username = ?',
    [username],
  );
  
  if (result === undefined) return false;
  if (result.password !== password) return false;

  return { id: result.id, username: result.username };
};

export default {
  validateSignIn,
};