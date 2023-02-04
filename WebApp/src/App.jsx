import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Login,
  Main,
  Products,
  Register,
  Session,
  Sessions,
  Venues,
} from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/venues",
      element: <Venues />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/sessions",
      element: <Sessions />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/session",
      element: <Session />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
