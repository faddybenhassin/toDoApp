import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/app/App.jsx'
import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import { AuthProvider } from './util/authProvider'
import { Toaster } from "sonner";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const router = createBrowserRouter([
  {path:"/", element: <App/>},
  {path:"/login", element: <Login/>},
  {path:"/register", element: <Register/>},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster richColors position="bottom-right" />
    </AuthProvider>
  </StrictMode>,
)
