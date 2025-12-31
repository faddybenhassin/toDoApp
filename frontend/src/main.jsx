import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/app/App.jsx'
import Login from './pages/login/login.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/login", element: <Login/>},
  {path:"/register", element: <Login/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
