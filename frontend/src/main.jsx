import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import './index.css'
import Projects from "./pages/Projects";
import Team from "./pages/Team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <AppLayout />,         
    children: [
      {
        index: true,              
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <Projects />, 
      },
      {
        path: "team",
        element: <Team />,       
      },
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)