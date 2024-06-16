import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import SignupSection from './pages/signupPage.tsx'
import Login from './pages/login.tsx'
import MarketView from './pages/marketView.tsx'
import {AuthProvider} from "../utils/authContext.tsx";

const isUserAuthenticated = sessionStorage.getItem('authenticatedUserId');

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
    path:"/marketView",
    element: isUserAuthenticated? <MarketView /> : <Login />
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
