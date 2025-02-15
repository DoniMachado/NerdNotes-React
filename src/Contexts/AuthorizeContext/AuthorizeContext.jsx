import React, { useEffect, createContext, useState } from "react";
import { useCookies } from "react-cookie";

const AuthorizeContext = createContext();

const AuthorizeProvider = ({ children }) => {
  const [token, setToken] = useState(process.env.REACT_APP_PRIVATE_API_TOKEN);
  const [cookies, setCookie, removeCookie] = useCookies([
    "PB_react_sessionID",
    "PB_react_accountID",
  ]);
  const [sessionID, setSessionID] = useState(cookies.PB_react_sessionID);
  const [accountID, setAccountID] = useState(cookies.PB_react_accountID);
  const [isAuthorized, setIsAuthorized] = useState(ValidateAuthorization);

  useEffect(() => {
    const isAuth = ValidateAuthorization();

    if (isAuth) {
      setSessionID(cookies.PB_react_sessionID);
      setAccountID(cookies.PB_react_accountID);
    } else {
      LogOut();
    }

    setIsAuthorized(isAuth);
  }, [cookies.PB_react_sessionID, cookies.PB_react_accountID]);

  function ValidateAuthorization() {
    let isAuth = false;

    if (
      cookies.PB_react_sessionID != null &&
      cookies.PB_react_sessionID.length > 0 &&
      cookies.PB_react_accountID != null
    )
      isAuth = true;

    return isAuth;
  }

  function LogIn(sessionID, accountID) {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie("PB_react_sessionID", sessionID, {
      path: "/",
      expires: date,
    });
    setCookie("PB_react_accountID", accountID, {
      path: "/",
      expires: date,
    });
  }

  function LogOut() {
    removeCookie("PB_react_sessionID");
    removeCookie("PB_react_accountID");
  }

  return (
    <AuthorizeContext.Provider
      value={{
        sessionID,
        accountID,
        isAuthorized,
        token,
        LogOut,
        LogIn,
      }}
    >
      {children}
    </AuthorizeContext.Provider>
  );
};

export { AuthorizeContext, AuthorizeProvider };
