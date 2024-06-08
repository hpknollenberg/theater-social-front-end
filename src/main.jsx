import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthContext } from './context.js'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'



function Layout() {
  return (
    <>
      <Header />
        <div id='page-content'>
          <Outlet />
        </div>
      <Footer />
    </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  }
])



const AuthContextProvider = ({ children }) => {
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





ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
)
