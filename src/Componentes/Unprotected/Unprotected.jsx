import { Outlet, Navigate } from "react-router-dom";
import { AuthorizeContext } from "../../Contexts/index.js";
import { useContext } from "react";

export default function Unprotected() {
  const { isAuthorized } = useContext(AuthorizeContext);

  return !isAuthorized ? <Outlet /> : <Navigate to="/" />;
}
