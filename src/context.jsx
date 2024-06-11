import React, { createContext, useState, useEffect } from 'react'



export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    let tempToken = JSON.parse(localStorage.getItem('token'))
    
    const [accessToken, setAccessToken] = useState(tempToken ? tempToken : [])
  
    useEffect(() => {
      localStorage.setItem("token", JSON.stringify(accessToken))
    }, [accessToken])
  
    
    const auth = {
      accessToken,
      setAccessToken,
    }
  
    return(
      <AuthContext.Provider value={{ auth: auth }} >
        {children}
      </AuthContext.Provider>
    )
  }



  export const UserContext = createContext()

  export const UserContextProvider = ({ children }) => {
    let tempUser = JSON.parse(localStorage.getItem('user'))
    
    const [user, setUser] = useState(tempUser ? tempUser : 0)
  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user))
    }, [user])
  
  
    return(
      <UserContext.Provider value={{ user, setUser }} >
        {children}
      </UserContext.Provider>
    )
  }



  export const AdminContext = createContext()

  export const AdminContextProvider = ({ children }) => {
    let tempAdmin = JSON.parse(localStorage.getItem('is_admin'))
    
    const [admin, setAdmin] = useState(tempAdmin ? tempAdmin : false)
  
    useEffect(() => {
      localStorage.setItem("is_admin", JSON.stringify(admin))
    }, [admin])
  
  
    return(
      <AdminContext.Provider value={{ admin, setAdmin }} >
        {children}
      </AdminContext.Provider>
    )
  }