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
            <tr>
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