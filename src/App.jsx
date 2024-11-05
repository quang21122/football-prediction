import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MatchDetails from "./pages/MatchDetails";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/matches/:id",
        element: <MatchDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
