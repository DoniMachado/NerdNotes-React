import style from "./Search.module.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { Card } from "../index.js";
import { CONTENT_TYPE_MOVIE, CONTENT_TYPE_TVSERIE } from "../../Utils";
import { LanguageContext, AuthorizeContext } from "../../Contexts/index.js";

export default function Search({ title, type }) {
  const { token } = useContext(AuthorizeContext);
  const { language, getTranslation } = useContext(LanguageContext);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [includeAdult, setIncludeAdult] = useState(false);
  const [query, setQuery] = useState("");
  const [hasQueryError, setHasQueryError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const [listMedias, setListMedias] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setPageIndex(1);
    GetSearchMedias(null, 1);
  }, [language]);

  async function GetSearchMedias(event, page) {
    if (event) event.preventDefault();

    if (firstRender) {
      setFirstRender(false);
      return;
    } else if (query == null || query.length === 0) {
      setHasQueryError(true);
      return;
    } else {
      setHasQueryError(false);
    }

    setIsLoading(true);
    try {
      const config = {
        Accept: "application/json",
        headers: { Authorization: `Bearer ${token}` },
      };

      let queryParams = `?language=${language}&include_adult=${includeAdult}&page=${page}`;

      if (query != null && query.length > 0)
        queryParams += `&query=${encodeURIComponent(query)}`;

      const url = `https://api.themoviedb.org/3/search/${type}`;
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
    <div className={style.search}>
      <h2 className={style.search_title}>{title}</h2>
      <form
        className={style.search_filter}
        onSubmit={(event) => {
          setPageIndex(1);
          GetSearchMedias(event, 1);
        }}
      >
        <div id={style.search_query_container}>
          <input
            type="text"
            id={style.search_query}
            className={`${hasQueryError ? style.search_query_empty : ""}`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={getTranslation("Common::Label::Title")}
          />
          {hasQueryError ? (
            <span id={style.search_query_error}>
              {getTranslation("Common::Label::Title::Error")}
            </span>
          ) : null}
        </div>

        <label className={style.search_checkbox}>
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(event) => setIncludeAdult((state) => !state)}
          />
          {type === CONTENT_TYPE_MOVIE
            ? getTranslation("Common::Label::Include::Adult::Movies")
            : getTranslation("Common::Label::Include::Adult::Series")}
        </label>

        <button type="submit" className={style.search_filter_button}>
          {getTranslation("Common::Label::Search")}
        </button>
      </form>
      {isLoading ? (
        <div className={style.search_loading}>
          <CircularProgress />
          <div>{getTranslation("Common::Label::Loading")}</div>
        </div>
      ) : errorMsg != null ? (
        <div className={style.search_error}>{errorMsg}</div>
      ) : listMedias === null ? (
        <div></div>
      ) : listMedias.length === 0 ? (
        <div className={style.search_media_content_empty}>
          {getTranslation("Common::Label::EmptyList")}
        </div>
      ) : (
        <div className={style.search_media_content_container}>
          <div className={style.search_media_content}>
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
          <div className={style.search_media_content_pagination}>
            {totalPages != null && totalPages > 1 ? (
              <Pagination
                count={totalPages}
                page={pageIndex}
                onChange={(event, page) => {
                  setPageIndex(page);
                  GetSearchMedias(null, page);
                }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
