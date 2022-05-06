import { ResultSetHeader } from 'mysql2';
import connection from './connection';

import { AddUser, User } from '../interfaces/interfaces';

const addUser = async (body: AddUser): Promise<User> => {
  const { username, classe, level, password } = body;

  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
    [username, classe, level, password],
  );

  const user = { id: result.insertId, username };
  
  return user;
};

export default {
  addUser,
};