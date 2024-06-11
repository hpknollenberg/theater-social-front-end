import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthContextProvider, UserContextProvider, AdminContextProvider } from './context'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Login from './Login.jsx'
import Showtimes from './Showtimes.jsx'
import UpcomingFilms from './UpcomingFilms.jsx'
import Menu from './Menu.jsx'
import Discussion from './Discussion.jsx'



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
      {
        path: '/showtimes',
        element: <Showtimes />
      },
      {
        path: '/upcomingfilms',
        element: <UpcomingFilms />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: 'discussion',
        element: <Discussion />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <UserContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </UserContextProvider>
  </AdminContextProvider> 
)
