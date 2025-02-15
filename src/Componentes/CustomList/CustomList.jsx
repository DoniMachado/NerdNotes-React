import style from "./CustomList.module.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { Card } from "../index.js";
import { CONTENT_TYPE_MOVIE, CONTENT_TYPE_TVSERIE } from "../../Utils";
import { LanguageContext, AuthorizeContext } from "../../Contexts/index.js";

export default function CustomList({ url, type, title }) {
  const { token, sessionID } = useContext(AuthorizeContext);
  const { language, getTranslation } = useContext(LanguageContext);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [listMedias, setListMedias] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setPageIndex(1);
    GetCustomListMedias(null, 1);
  }, [language]);

  async function GetCustomListMedias(event, page) {
    if (event) event.preventDefault();

    setIsLoading(true);
    try {
      const config = {
        Accept: "application/json",
        headers: { Authorization: `Bearer ${token}` },
      };

      let queryParams = `?language=${language}&page=${page}&session_id=${sessionID}`;

      const response = await axios.get(url + queryParams, config);
      const data = response.data;

      setListMedias(data.results);
      setIsLoading(false);
      setErrorMsg(null);
      setTotalPages(data.total_pages);
    } catch (error) {
      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
      setPageIndex(1);
      setTotalPages(0);
      setListMedias(null);
    }
  }

  return (
    <div className={style.custom_list}>
      <h2 className={style.custom_list_title}>{title}</h2>
      {isLoading ? (
        <div className={style.custom_list_loading}>
          <CircularProgress />
          <div>{getTranslation("Common::Label::Loading")}</div>
        </div>
      ) : errorMsg != null ? (
        <div className={style.custom_list_error}>{errorMsg}</div>
      ) : listMedias === null || listMedias.length === 0 ? (
        <div className={style.custom_list_media_content_empty}>
          {getTranslation("Common::Label::EmptyList")}
        </div>
      ) : (
        <div className={style.custom_list_media_content_container}>
          <div className={style.custom_list_media_content}>
            {listMedias.map((element) => (
              <Card
                key={element.id}
                type={type}
                id={element.id}
                title={
                  element.title ??
                  element.original_title ??
                  element.name ??
                  element.original_name
                }
                description={element.overview}
                release_date={element.release_date ?? element.first_air_date}
                vote_average={element.vote_average}
                vote_count={element.vote_count}
                image={element.poster_path ?? element.backdrop_path}
                genres={element.genre_ids}
                popularity={element.popularity}
              />
            ))}
          </div>
          <div className={style.custom_list_media_content_pagination}>
            {totalPages != null && totalPages > 1 ? (
              <Pagination
                count={totalPages}
                page={pageIndex}
                onChange={(event, page) => {
                  setPageIndex(page);
                  GetCustomListMedias(null, page);
                }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
