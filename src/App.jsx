import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ThemeContext } from "./Contexts/index.js";
import React, { useContext } from "react";
import { Protected, Unprotected, Layout } from "./Componentes/index.js";
import {
  Discover,
  NotFound,
  Search,
  Details,
  Login,
  Favorites,
  Watchlist,
  Rated,
} from "./Pages/index.js";

export default function App() {
  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route element={<Protected />}>
          <Route index element={<Discover />} />
          <Route path="discover" element={<Navigate replace={true} to="/" />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="rated" element={<Rated />} />
          <Route path="details/:type/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<Unprotected />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className={`App ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}
