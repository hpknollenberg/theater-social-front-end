import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getToken } from './api'
import { AuthContext } from "./context"


const CreateNewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext)

  const submit = () => {
    createUser({ username, password, firstName, lastName, adminKey })
    .then ((response) => {
      getToken({ auth, username, password })
      .then ((response) => {
        navigate("/")
     })
    })
    
    }
  
  
  const SubmitButton = () => {
    if (username && password && firstName && lastName && password === confirmPassword) {
      return(
      <div style={{ marginTop: 20 }}>
        <button onClick={() => submit()}>Submit</button>
      </div>
      )
    } else if (password !== confirmPassword) {
      return (
      <div style={{ marginTop: 20 }}>
        <p style={{ color: "white", fontWeight: 'bold' }}>PASSWORDS DO NOT MATCH</p>
        <button>Submit</button>
      </div>
      )
    } else {
      return (
        <div style={{ marginTop: 20 }}>
        <button>Submit</button>
      </div>
      )
    }
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
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div>
        <div>Confirm Password:</div>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
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
      <SubmitButton />
    </div>
  )
}

export default CreateNewUser