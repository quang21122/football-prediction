import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ClubDetails from "./pages/ClubDetails-v2";
import MatchDetails from "./pages/MatchDetails-v2";
import Standings from "./pages/Standings-v2";

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
      {
        path: "/clubs/:id",
        element: <ClubDetails />,
      },
      {
        path: "/standings/:leagueId",
        element: <Standings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
