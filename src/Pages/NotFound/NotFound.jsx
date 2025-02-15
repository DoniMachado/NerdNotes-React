import { useLocation } from "react-router-dom";
import style from "./NotFound.module.css";
import not_found_img from "../../Imagens/not-found.webp";
import React, { useContext } from "react";
import { LanguageContext } from "../../Contexts/index.js";

export default function NotFound(props) {
  let location = useLocation();
  const { getTranslation } = useContext(LanguageContext);

  return (
    <div id={style.not_found}>
      <img
        id={style.not_found_img}
        src={not_found_img}
        alt={getTranslation("404::NotFound::Page::Image")}
        title={getTranslation("404::NotFound::Page::Image")}
      />
      <div id={style.not_found_content}>
        <h2>{getTranslation("404::NotFound::Page::Title")}</h2>
        <p>({location.state?.pathname ?? location.pathname})</p>
      </div>
    </div>
  );
}
