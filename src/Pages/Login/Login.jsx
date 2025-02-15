import style from "./Login.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  LanguageContext,
  AuthorizeContext,
  GlobalComponentsContext,
} from "../../Contexts";

export default function LoginPage() {
  const { language, getTranslation } = useContext(LanguageContext);
  const { token, LogIn } = useContext(AuthorizeContext);
  const { showAlert } = useContext(GlobalComponentsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [authenticationInfo, setAuthenticationInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    user: "",
    password: "",
  });
  const [userInfoErrors, setUserInfoErrors] = useState({
    userError: false,
    passwordError: false,
  });

  const config = {
    Accept: "application/json",
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    GetRequestToken();
    showAlert("Login::Tooltip::Credentials");
  }, [language]);

  async function GetRequestToken() {
    let success;
    setIsLoading(true);
    try {
      const url = "https://api.themoviedb.org/3/authentication/token/new";
      const response = await axios.get(url, config);

      const data = response.data;
      //console.log(data);

      setIsLoading(false);
      setErrorMsg(null);
      setAuthenticationInfo(data);
      success = true;
    } catch (error) {
      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
      setAuthenticationInfo(null);
      success = false;
    }
    return success;
  }

  async function Authenticate(ev) {
    ev.preventDefault();

    if (
      authenticationInfo == null ||
      authenticationInfo.request_token == null ||
      authenticationInfo.request_token.length === 0 ||
      new Date(authenticationInfo.expires_at) <= new Date()
    ) {
      let success = await GetRequestToken();
      if (!success) return;
    }

    if (!Validate()) return;

    setIsLoading(true);
    try {
      const url =
        "https://api.themoviedb.org/3/authentication/token/validate_with_login";
      const response = await axios.post(
        url,
        {
          username: userInfo.user,
          password: userInfo.password,
          request_token: authenticationInfo.request_token,
        },
        config
      );

      const data = response.data;
      //console.log(data);

      setIsLoading(false);
      setErrorMsg(null);

      await Login(data.request_token);
    } catch (error) {
      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
    }
  }

  async function Login(token) {
    setIsLoading(true);
    try {
      const url = "https://api.themoviedb.org/3/authentication/session/new";
      const response = await axios.post(
        url,
        {
          request_token: token,
        },
        config
      );

      const data = response.data;
      //console.log(data);

      setIsLoading(false);
      setErrorMsg(null);

      await AccountInfos(data.session_id);
    } catch (error) {
      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
    }
  }

  async function AccountInfos(session_id) {
    setIsLoading(true);
    try {
      const url = "https://api.themoviedb.org/3/account";
      const queryParams = `?session_id=${encodeURIComponent(session_id)}`;

      const response = await axios.get(url + queryParams, config);

      const data = response.data;
      //console.log(data);

      setIsLoading(false);
      setErrorMsg(null);
      LogIn(session_id, data.id);
    } catch (error) {
      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
    }
  }

  function Validate() {
    let valid = true;
    const temp = {
      userError: false,
      passwordError: false,
    };
    setErrorMsg(null);

    //console.log(userInfo);

    if (
      userInfo == null ||
      userInfo.user == null ||
      userInfo.user.length === 0
    ) {
      temp.userError = true;
      valid = false;
    }

    if (
      userInfo == null ||
      userInfo.password == null ||
      userInfo.password.length === 0
    ) {
      temp.passwordError = true;
      valid = false;
    }

    if (
      authenticationInfo == null ||
      authenticationInfo.request_token == null ||
      authenticationInfo.request_token.length === 0
    ) {
      valid = false;
      setErrorMsg(getTranslation("Common::Label::RequestToken::Invalid"));
    }

    setUserInfoErrors(temp);
    return valid;
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div id={style.login}>
      <form id={style.login_content} onSubmit={(ev) => Authenticate(ev)}>
        <div className={style.login_input_container}>
          <input
            type="text"
            className={`${style.login_input} ${
              userInfoErrors.userError ? style.login_input_empty : ""
            }`}
            value={userInfo.user}
            onChange={(event) =>
              setUserInfo({ ...userInfo, user: event.target.value })
            }
            placeholder={getTranslation("Common::Label::User")}
          />
          {userInfoErrors.userError ? (
            <span className={style.login_input_error}>
              {getTranslation("Common::Label::User::Error")}
            </span>
          ) : null}
        </div>

        <div className={style.login_input_container}>
          <input
            type={showPassword ? "text" : "password"}
            className={`${style.login_input} ${
              userInfoErrors.passwordError ? style.login_input_empty : ""
            }`}
            value={userInfo.password}
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            placeholder={getTranslation("Common::Label::Password")}
          />
          {showPassword ? (
            <FaRegEye
              className={style.login_password_icon}
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              className={style.login_password_icon}
              onClick={toggleShowPassword}
            />
          )}
          {userInfoErrors.passwordError ? (
            <span className={style.login_input_error}>
              {getTranslation("Common::Label::Password::Error")}
            </span>
          ) : null}
        </div>

        <button type="submit" id={style.login_button}>
          {isLoading ? (
            <>
              <CircularProgress />
              {getTranslation("Common::Label::Loading")}
            </>
          ) : (
            getTranslation("Common::Label::Login::Button")
          )}
        </button>
      </form>

      {errorMsg != null ? <div id={style.login_error}>{errorMsg}</div> : null}
    </div>
  );
}
