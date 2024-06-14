import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "./context"
import { useContext } from "react"





function Header() {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()
  
  
  function submit() {
    auth.setAccessToken([])
    navigate('/')
  }


  return (
    <div style={{ padding: '10px', backgroundColor: 'black'}} className="d-flex justify-content-between">
      <Link style={{ marginRight: 20, color: "white" }} to='/login' onClick={() => {submit()}}>Logout</Link>
      <div style={{ fontWeight: 'bold' }}>Cinema Social</div>
    </div>
  )
}

export default Header