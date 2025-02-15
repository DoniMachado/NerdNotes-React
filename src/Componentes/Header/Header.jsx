import { useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiNotebook, GiHamburgerMenu } from "react-icons/gi";
import style from "./Header.module.css";
import {
  LanguageContext,
  AuthorizeContext,
  ThemeContext,
} from "../../Contexts/index.js";
import { FaSun } from "react-icons/fa";
import { BsMoonStars } from "react-icons/bs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { US, BR, ES } from "country-flag-icons/react/3x2";
import { MdLogout } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";

export default function Header() {
  const headerNavMenu = useRef(null);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage, getTranslation } = useContext(LanguageContext);
  const { isAuthorized, LogOut } = useContext(AuthorizeContext);

  function ToogleHiddenMobile() {
    headerNavMenu.current.classList.toggle(style.hidden_mobile);
  }

  return (
    <header id={style.header}>
      <div id={style.header_container}>
        <div id={style.header_main_container}>
          <GiNotebook id={style.header_logo} title="Logo" />
          <h1 id={style.header_title}>NerdNotes</h1>
        </div>
        {isAuthorized ? (
          <GiHamburgerMenu
            id={style.header_nav_menu_button}
            title="Nav Menu"
            onClick={ToogleHiddenMobile}
          />
        ) : null}
        {!isDarkTheme() ? (
          <FaSun
            className={style.header_theme_icon}
            onClick={() => toggleTheme()}
          />
        ) : (
          <BsMoonStars
            className={style.header_theme_icon}
            onClick={() => toggleTheme()}
          />
        )}
        <Select
          id={style.header_language}
          value={language}
          onChange={(ev) => setLanguage(ev.target.value)}
        >
          <MenuItem value="pt-BR">
            <BR
              title={getTranslation("Language::Label::Portuguese")}
              className={style.header_language_item}
            />
          </MenuItem>
          <MenuItem value="en-US">
            <US
              title={getTranslation("Language::Label::English")}
              className={style.header_language_item}
            />
          </MenuItem>
          <MenuItem value="es-ES">
            <ES
              title={getTranslation("Language::Label::Spanish")}
              className={style.header_language_item}
            />
          </MenuItem>
        </Select>
      </div>
      {isAuthorized ? (
        <nav
          ref={headerNavMenu}
          id={style.header_nav_menu_container}
          className={style.hidden_mobile}
        >
          <ul id={style.header_nav_menu}>
            <li className={style.header_nav_menu_item}>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to="/"
              >
                {getTranslation("Page::Label::Discover")}
              </NavLink>
            </li>
            <li className={style.header_nav_menu_item}>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to="/search"
              >
                {getTranslation("Page::Label::Search")}
              </NavLink>
            </li>
            <li className={style.header_nav_menu_item}>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to="/favorites"
              >
                {getTranslation("Page::Label::Favorites")}
              </NavLink>
            </li>
            <li className={style.header_nav_menu_item}>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to="/watchlist"
              >
                {getTranslation("Page::Label::Watchlist")}
              </NavLink>
            </li>
            <li className={style.header_nav_menu_item}>
              <NavLink
                className={({ isActive }) => (isActive ? style.active : "")}
                to="/rated"
              >
                {getTranslation("Page::Label::Rated")}
              </NavLink>
            </li>
            <li className={style.header_nav_menu_item}>
              <Tooltip
                title={getTranslation("Common::Label::Logout::Button")}
                placement="bottom"
                arrow
              >
                <IconButton id={style.header_logout} onClick={LogOut}>
                  <MdLogout />
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
