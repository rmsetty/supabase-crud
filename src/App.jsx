import React, { useState, useEffect } from 'react';
import { supabase } from './createClient';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', age: '' });
  const [editUser, setEditUser] = useState({ id: '', name: '', age: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase
      .from('users')
      .select('*');
    setUsers(data);
  }

  function handleNewUserChange(event) {
    const { name, value } = event.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditUserChange(event) {
    const { name, value } = event.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  }

  async function createUser(event) {
    event.preventDefault();
    await supabase
      .from('users')
      .insert({ name: newUser.name, age: newUser.age });
    fetchUsers();
    setNewUser({ name: '', age: '' });
  }

  async function deleteUser(userID) {
    await supabase
      .from('users')
      .delete()
      .eq('id', userID);
    fetchUsers();
  }

  async function updateUser(event) {
    event.preventDefault();
    await supabase
      .from('users')
      .update({ name: editUser.name, age: editUser.age })
      .eq('id', editUser.id);
    fetchUsers();
    setEditUser({ id: '', name: '', age: '' });
  }

  function populateEditForm(userID) {
    const user = users.find((u) => u.id === userID);
    if (user) {
      setEditUser({ id: user.id, name: user.name, age: user.age });
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>User Management</h1>

      {/* Create User Form */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={createUser} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleNewUserChange}
            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', width: '200px' }}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newUser.age}
            onChange={handleNewUserChange}
            style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', width: '100px' }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Create
          </button>
        </form>
      </div>

      {/* Edit User Form */}
      {editUser.id && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={updateUser} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={editUser.name}
              onChange={handleEditUserChange}
              style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', width: '200px' }}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={editUser.age}
              onChange={handleEditUserChange}
              style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ccc', width: '100px' }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                backgroundColor: '#28A745',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Users Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Age</th>
            <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{user.id}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{user.name}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{user.age}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                <button
                  onClick={() => populateEditForm(user.id)}
                  style={{
                    padding: '5px 15px',
                    borderRadius: '10px',
                    backgroundColor: '#007BFF', 
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{
                    padding: '5px 15px',
                    borderRadius: '10px',
                    backgroundColor: '#DC3545',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
