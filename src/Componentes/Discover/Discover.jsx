import style from "./Discover.module.css";
import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { Card } from "../index.js";
import { CONTENT_TYPE_MOVIE, CONTENT_TYPE_TVSERIE } from "../../Utils";
import { LanguageContext, AuthorizeContext } from "../../Contexts/index.js";

export default function Discover({
  title,
  genres,
  orders,
  initialOrder,
  type,
}) {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [includeAdult, setIncludeAdult] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(initialOrder);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const [listMedias, setListMedias] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { token } = useContext(AuthorizeContext);
  const { language, getTranslation } = useContext(LanguageContext);

  useEffect(() => {
    setPageIndex(1);
    GetDiscoveryMedias(null, 1);
  }, [language]);

  function AddGenreFilter(idGenre, genreToFilter) {
    const genre = selectedGenre?.find((element) => element.value === idGenre);

    if (!genre) {
      setSelectedGenre([...selectedGenre, genreToFilter]);
      setPageIndex(1);
      GetDiscoveryMedias(null, 1);
    }
  }

  async function GetDiscoveryMedias(event, page) {
    if (event) event.preventDefault();

    setIsLoading(true);
    try {
      const config = {
        Accept: "application/json",
        headers: { Authorization: `Bearer ${token}` },
      };

      let queryParams = `?language=${language}&include_adult=${includeAdult}&page=${page}&sort_by=${selectedOrder.value}`;

      if (selectedStartDate != null && selectedStartDate.length > 0) {
        if (type == CONTENT_TYPE_MOVIE)
          queryParams += `&primary_release_date.gte=${selectedStartDate}`;
        else queryParams += `&first_air_date.gte=${selectedStartDate}`;
      }

      if (selectedEndDate != null && selectedEndDate.length > 0) {
        if (type == CONTENT_TYPE_MOVIE)
          queryParams += `&primary_release_date.lte=${selectedEndDate}`;
        else queryParams += `&first_air_date.lte=${selectedEndDate}`;
      }

      if (selectedGenre != null && selectedGenre.length > 0)
        queryParams += `&with_genres=${encodeURIComponent(
          selectedGenre.map((g) => g.value).join(",")
        )}`;

      const url = `https://api.themoviedb.org/3/discover/${type}`;

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
    <div className={style.discover}>
      <h2 className={style.discover_title}>{title}</h2>
      <form
        className={style.discover_filter}
        onSubmit={(event) => {
          setPageIndex(1);
          GetDiscoveryMedias(event, 1);
        }}
      >
        <Select
          className={style.discover_select}
          classNamePrefix={style.discover_select}
          value={selectedGenre}
          onChange={(choices) => setSelectedGenre(choices)}
          options={genres}
          getOptionLabel={(option) => getTranslation(option.label)}
          isMulti
          isSearchable
          placeholder={getTranslation("Common::Label::Select::Genre")}
        />
        <Select
          className={style.discover_select}
          classNamePrefix={style.discover_select}
          value={selectedOrder}
          onChange={(choice) => setSelectedOrder(choice)}
          options={orders}
          getOptionLabel={(option) => getTranslation(option.label)}
          isSearchable
        />

        <label className={style.discover_checkbox}>
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(event) => setIncludeAdult((state) => !state)}
          />
          {type === CONTENT_TYPE_MOVIE
            ? getTranslation("Common::Label::Include::Adult::Movies")
            : getTranslation("Common::Label::Include::Adult::Series")}
        </label>

        <div className={style.discover_date}>
          <label>{getTranslation("Common::Label::Realise::Period")}</label>
          <div className={style.discover_date_inputs_container}>
            <input
              type="date"
              checked={selectedStartDate}
              onChange={(event) => setSelectedStartDate(event.target.value)}
            />
            <input
              type="date"
              checked={selectedEndDate}
              onChange={(event) => setSelectedEndDate(event.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={style.discover_filter_button}>
          {getTranslation("Common::Label::Search")}
        </button>
      </form>
      {isLoading ? (
        <div className={style.discover_loading}>
          <CircularProgress />
          <div>{getTranslation("Common::Label::Loading")}</div>
        </div>
      ) : errorMsg != null ? (
        <div className={style.discover_error}>{errorMsg}</div>
      ) : listMedias === null || listMedias.length === 0 ? (
        <div className={style.discover_media_content_empty}>
          {getTranslation("Common::Label::EmptyList")}
        </div>
      ) : (
        <div className={style.discover_media_content_container}>
          <div className={style.discover_media_content}>
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
                AddGenreFilter={AddGenreFilter}
              />
            ))}
          </div>
          <div className={style.discover_media_content_pagination}>
            {totalPages != null && totalPages > 1 ? (
              <Pagination
                count={totalPages}
                page={pageIndex}
                onChange={(event, page) => {
                  setPageIndex(page);
                  GetDiscoveryMedias(null, page);
                }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
