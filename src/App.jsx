import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Club from "./pages/Club-v2";
import ClubDetails from "./pages/ClubDetails-v2";
import MatchDetails from "./pages/MatchDetails";
import Standings from "./pages/Standings";
import ChatBot from "./components/chatbot/ChatBot";
import NavigationBar from "./components/navbar/navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/footer/footer";
import { UserProvider } from "./context/userContext";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import DeleteAccount from "./pages/DeleteAccount";
const MainLayout = () => (
  <>
    <NavigationBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/clubs",
        element: <Club />,
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
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/chatbot",
        element: <ChatBot />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
      {
        path: "/deleteaccount",
        element: <DeleteAccount />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <UserProvider>
        <div className="mt-[3.75rem] min-h-screen overflow-x-hidden flex flex-col">
          <RouterProvider router={router} />
          {/* <DeleteAccount/> */}
          {/* <ChangePassword/> */}
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
