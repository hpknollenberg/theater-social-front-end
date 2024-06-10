import { useContext, useState, useEffect } from "react"
import { AuthContext, UserContext } from "./context"
import { fetchUser, baseUrl } from "./api"
import { useNavigate } from "react-router-dom"
import Tabs from "./Tabs"
import PostUpload from "./PostUpload"
import Posts from "./Posts"


function App() {
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setUser(response.data.id)
      console.log("Profile: ", response)
    })
    .catch(() => {
      navigate("/login")
    })
  }, [auth.accessToken])


  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="feed" />
      </div>
      <div>
        <PostUpload />
        <Posts />
      </div>
      
    </div>
  )
}


export default App

