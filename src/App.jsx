import React, {useState, useEffect} from 'react'
import { supabase } from './createClient'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    name:'', age:''
  })

  console.log(users)
  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers(){
    const {data} = await supabase
    .from('users')
    .select('*')
    setUsers(data)
  }

  function handleChange(event){
    setUser(prevFormData => {
      return {
        ...prevFormData,
      [event.target.name]:event.target.value
      }
    })
  }

  async function createUser(){
    const { error } = await supabase
  .from('users')
  .insert({ name: user.name, age: user.age })
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          name='name'
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Age"
          name='age'
          onChange={handleChange}
        />
        <button type="submit">
          Create
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) =>           
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr> 
          )}
        </tbody>
      </table>
    </div>
  )}

export default App