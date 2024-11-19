import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClubDetails from "./pages/ClubDetails-v2";
import MatchDetails from "./pages/MatchDetails-v2";
import Standings from "./pages/Standings-v2";
import NavigationBar from "./components/navbar/navbar";
import SignIn from "./pages/SignIn";

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
        path: "/signin",
        element: <SignIn/>,
      },
    ],
  },
]);

function App() {
  // return (
  //   <div className="App">
  //     <NavigationBar />
  //     <div className="mt-[3.75rem]">
  //     <RouterProvider router={router} />
  //     </div>
  //   </div>
  // )
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <div className="mt-[3.75rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/matches/:id" element={<MatchDetails />} />
            <Route path="/clubs/:id" element={<ClubDetails />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
