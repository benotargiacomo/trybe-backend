import React, { useContext } from 'react';
import axios from 'axios';
import ApplicationContext from '../context/applicationContext';

export default function AdminUsers() {
  const { users, setReload } = useContext(ApplicationContext);

  const tableHead = [
    'Item',
    'Nome',
    'E-mail',
    'Tipo',
    'Excluir',
  ];

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user/${id}`);
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table>
        <thead>
          <tr>
            { tableHead.map((title) => (<th key={ title }>{ title }</th>))}
          </tr>
        </thead>
        <tbody>
          { users.map((user, index) => (
            <tr
              key={ user.id }
            >
              <th
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                { index + 1 }
              </th>
              <th
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                {user.name}
              </th>
              <th
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {user.email}
              </th>
              <th
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {user.role === 'seller' ? 'P.Vendedora' : 'Cliente'}
              </th>
              <th
                data-testid={
                  `admin_manage__element-user-table-remove-${index}`
                }
              >
                (
                <button
                  type="button"
                  onClick={ () => deleteUser(user.id) }
                >
                  EXCLUIR
                </button>
                )
              </th>
            </tr>
          )) }
        </tbody>
      </table>

    </div>
  );
}
