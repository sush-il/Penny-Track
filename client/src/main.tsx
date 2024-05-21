import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import SignupSection from './pages/signupPage.tsx'
import Accounts from './pages/accounts.tsx'
import './index.css'
import Login from './pages/login.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <App />
  },
  {
    path:"/accounts",
    element: <Accounts />
  },
  {
    path: "/register",
    element: <SignupSection />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
