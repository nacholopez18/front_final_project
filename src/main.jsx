import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import ChekIn from "./pages/ChekIn/ChekIn";
import AccountCreate from "./pages/Register/AccountCreate";
import ContextualMusic from "./pages/ContextualMusic/ContextualMusic";
import PlaylistContextual from "./pages/Playlist/PlaylistContextual";
import PlaylistCupido from "./pages/Playlist/PlaylistCupido";
import MusicalCupido from "./pages/MusicalCupido/MusicalCupido";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Profile/Settings";
import NewPlaylist from "./pages/Profile/NewPlaylist";
import ErrorPage from "./pages/Error/PageError";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ChekIn></ChekIn>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/register",
    element: <Register></Register>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/account-create",
    element: <AccountCreate></AccountCreate>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/search",
    element: <Search />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/ContextualMusic",
    element: <ContextualMusic />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/newPlaylist",
    element: <NewPlaylist />,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/musicalcupido",
    element: <MusicalCupido></MusicalCupido>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/Playlistcontextual",
    element: <PlaylistContextual/>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/Playlistcupido",
    element: <PlaylistCupido/>,
    errorElement: <ErrorPage></ErrorPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
