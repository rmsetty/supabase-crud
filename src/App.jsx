import React, {useState, useEffect} from 'react'
import { supabase } from './createClient'

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({
    name:'', age:''
  })
  const [user2, setUser2] = useState({
    id: '', name:'', age:''
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

  function handleChange2(event){
    setUser2(prevFormData => {
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
    fetchUsers()
  }

  async function deleteUser(userID){
    const response = await supabase
    .from('users')
    .delete()
    .eq('id', userID)

    fetchUsers()

    if(error)
    {
      console.log(error)
    }

    if(data)
    {
      console.log(data);
    }

  }

  async function updateUser(userID){
    const { data, error } = await supabase
    .from('users')
    .update({ id:user2.id, name: user2.name, age: user2.age })
    .eq('id', userID)
    
    fetchUsers()

    if(error)
      {
        console.log(error)
      }
  
      if(data)
      {
        console.log(data);
      }

  }

  function displayUser(userID){

    users.map((user) => {
      if(user.id == userID)
      {
        setUser2({id:user.id, name: user.name, age:user.age})
      }
    })

  }

  return (
    <div>
      
      {/* Form 1 */}
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

        {/* Form 2 */}
        <form onSubmit={()=>updateUser(user2.id)}>
          <input
            type="text"
            name='name'
            onChange={handleChange2}
            value={user2.name}
          />
          <input
            type="number"
            name='age'
            onChange={handleChange2}
            value={user2.age}
          />
          <button type="submit">
            Save Changes
          </button>
      </form>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) =>           
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
              <button onClick={() => displayUser(user.id)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr> 
          )}
        </tbody>
      </table>
    </div>
  )}

export default App