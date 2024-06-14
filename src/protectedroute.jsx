import { Navigate, Outlet } from 'react-router-dom' 
import { useContext } from 'react'
import { AuthContext } from './context'

const Protected = () => {
    const { auth } = useContext(AuthContext)
    return auth.accessToken != "" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace={true} />
    )
  }

  export default Protected