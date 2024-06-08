import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./context"
import { fetchUser, baseUrl } from "./api"
import { useNavigate } from "react-router-dom"


function App() {
  const { auth } = useContext(AuthContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)

    })
    .catch(() => {
      navigate("/login")
    })
  }, [auth.accessToken])


  return (
    <div className='' >
      <div className="d-flex justify-content-start">
        <h1>{firstName} {lastName}</h1>
        <h4 style={{boxShadow: '10px 10px'}}>{}</h4>
      </div>
      
    </div>
  )
}


export default App

