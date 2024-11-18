import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ClubDetails from "./pages/ClubDetails-v2";
import MatchDetails from "./pages/MatchDetails-v2";
import Standings from "./pages/Standings-v2";
import NavigationBar from "./components/navbar/navbar";
import ChatBot from "./components/chatbot/chatbot";

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
        path: "/standings",
        element: <Standings />,
      },
      {
        path: "/chatbot",
        element: <ChatBot />,
      }
    ],
  },
]);

function App() {
  return (
    <div>
    <NavigationBar />
      <div style={{ paddingTop: '3.75rem' }}>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;
