import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getToken } from './api'
import { AuthContext } from "./context"


const CreateNewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)

  const submit = () => {
    createUser({ username, password, firstName, lastName })
    .then ((response) => {
      getToken({ auth, username, password })
      .then ((response) => {
        navigate("/")
     })
    })
    
    }
  

  return (
    <div>
      <h1>Create New User</h1>
      <div>
        <div>Username:</div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>

      <div>
        <div>Password:</div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div>
        <div>First Name:</div>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </div>

      <div>
        <div>Last Name:</div>
        <input
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  )
}

export default CreateNewUser