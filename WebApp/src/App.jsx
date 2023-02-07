import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Login,
  Main,
  Products,
  Register,
  Session,
  Sessions,
  Summary,
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
    {
      path: "/summary/:sessionId",
      element: <Summary />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
