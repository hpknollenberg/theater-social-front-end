import { useContext, useState, useEffect } from "react"
import { AdminContext, AuthContext, UserContext } from "./context"
import { fetchUser, baseUrl } from "./api"
import Tabs from "./Tabs"
import PostUpload from "./PostUpload"
import Posts from "./Posts"


function App() {
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const { admin, setAdmin } = useContext(AdminContext)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  
  useEffect(() => {
    fetchUser({ auth })
    .then((response) => {
      setFirstName(response.data.first_name)
      setLastName(response.data.last_name)
      setAdmin(response.data.is_admin)
      setUser(response.data.id)
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

