import React, {useState, useEffect} from 'react'
import { supabase } from './createClient'

const App = () => {
  const [users, setUsers] = useState([])
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
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )}

export default App