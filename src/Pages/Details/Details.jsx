import style from "./Details.module.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  LanguageContext,
  AuthorizeContext,
  GlobalComponentsContext,
} from "../../Contexts/index.js";
import {
  CONTENT_TYPE_MOVIE,
  CONTENT_TYPE_TVSERIE,
  IMAGE_DEFAULT,
  getGenres,
} from "../../Utils";
import { RatingDialog } from "../../Componentes";
import { Chip, Rating, CircularProgress } from "@mui/material";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlinePlaylistRemove,
  MdPlaylistAdd,
  MdStar,
} from "react-icons/md";
import { CiBookmarkPlus } from "react-icons/ci";
import { Comments } from "../../Componentes";

export default function DetailsPage() {
  const { language, getTranslation } = useContext(LanguageContext);
  const { token, sessionID, accountID } = useContext(AuthorizeContext);
  const { showAlert } = useContext(GlobalComponentsContext);

  let { id, type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const config = {
    Accept: "application/json",
    headers: { Authorization: `Bearer ${token}` },
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [details, setDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(null);

  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [watchlist, setWatchlist] = useState(false);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(null);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);

  function showRatingDialog() {
    setRatingDialogOpen(true);
  }

  function closeRatingDialog() {
    setRatingDialogOpen(false);
  }

  async function ratingDialogConfirmButtonAction(actualRating, oldRating) {
    setRatingLoading(true);
    if (oldRating && !actualRating) {
      await removeRating();
    } else {
      await addRating(actualRating);
    }
    setRatingLoading(false);
    closeRatingDialog();
  }

  async function addRating(actualRating) {
    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}/rating`;

      const queryParams = `?session_id=${encodeURIComponent(sessionID)}`;

      const response = await axios.post(
        url + queryParams,
        {
          value: actualRating,
        },
        config
      );
      const data = response.data;

      console.log("Data", data);
      setRated(true);
      setRating(actualRating);
      setWatchlist(false);
      showAlert("Rating::Label::Rate::Success", "success");
    } catch (error) {
      showAlert("Rating::Label::Rate::Error", "error");
    }
  }

  async function removeRating() {
    try {
      const url = `https://api.themoviedb.org/3/${type}/${id}/rating`;

      const queryParams = `?session_id=${encodeURIComponent(sessionID)}`;

      const response = await axios.delete(url + queryParams, config);
      const data = response.data;

      console.log("Data", data);
      setRated(false);
      setRating(null);
      showAlert("Rating::Label::Remove::Rate::Success", "success");
    } catch (error) {
      showAlert("Rating::Label::Remove::Rate::Error", "error");
    }
  }

  let currentGenreList = getGenres(type);

  function GetGenreLabel(element, index) {
    const item = currentGenreList.find((e) => e.value == element.id);

    if (item)
      return (
        <Chip
          className={style.details_genre_chip}
          key={index}
          label={getTranslation(item.label)}
        />
      );
    else
      return (
        <Chip className={style.details_genre_chip} key={index} label="-" />
      );
  }

  useEffect(() => {
    GetDetails();
  }, [language]);

  async function GetDetails() {
    let url;

    switch (type) {
      case CONTENT_TYPE_MOVIE:
      case CONTENT_TYPE_TVSERIE:
        url = `https://api.themoviedb.org/3/${type}/${id}`;
        break;
      default:
        navigate("/404", { state: { pathname: location.pathname } });
    }

    setIsLoading(true);
    try {
      let queryParams = `?language=${language}&append_to_response=account_states,images,videos`;

      if (sessionID)
        queryParams += `&session_id=${encodeURIComponent(sessionID)}`;

      const response = await axios.get(url + queryParams, config);
      const data = response.data;

      console.log("Data", data);

      setDetails(data);
      setIsLoading(false);
      setErrorMsg(null);
      setImage(data?.poster_path ?? data?.backdrop_path);
      setTitle(
        data?.title ?? data?.original_title ?? data?.name ?? data?.original_name
      );
      setVideo(
        data?.videos?.results?.find(
          (v) =>
            v.type === "Trailer" &&
            v.site === "YouTube" &&
            v.key != null &&
            v.key.length > 0
        )?.key
      );
      setFavorite(data?.account_states?.favorite ?? false);
      setWatchlist(data?.account_states?.watchlist ?? false);
      setRated(data?.account_states?.rated ?? false);
      setRating(data?.account_states?.rated?.value);
    } catch (error) {
      if (
        error?.response?.data?.status_code === 6 ||
        error?.response?.data?.status_code === 34
      )
        navigate("/404", { state: { pathname: location.pathname } });

      let errorMessage =
        error?.response?.data?.status_message ??
        error?.message ??
        getTranslation("Common::Label::Error:Unexpected");

      setIsLoading(false);
      setErrorMsg(errorMessage);
      setDetails(null);
      setImage(null);
      setTitle(null);
      setVideo(null);
      setFavorite(false);
      setWatchlist(false);
      setRated(false);
      setRating(null);
    }
  }

  async function ToggleFavorite() {
    setFavoriteLoading(true);
    const favStatus = !favorite;
    try {
      let url = `https://api.themoviedb.org/3/account/${accountID}/favorite`;

      const queryParams = `?session_id=${encodeURIComponent(sessionID)}`;

      const response = await axios.post(
        url + queryParams,
        {
          media_type: type,
          media_id: id,
          favorite: favStatus,
        },
        config
      );
      const data = response.data;

      console.log("Data", data);
      setFavoriteLoading(false);
      setFavorite(favStatus);
      const sucessMessage = favStatus
        ? "Favorite::Label::Success"
        : "Unfavorite::Label::Success";
      showAlert(sucessMessage, "success");
    } catch (error) {
      const errorMessage = favStatus
        ? "Favorite::Label::Error"
        : "Unfavorite::Label::Error";
      setFavoriteLoading(false);
      showAlert(errorMessage, "error");
    }
  }

  async function ToggleWatchList() {
    setWatchlistLoading(true);
    const watchlistStatus = !watchlist;
    try {
      let url = `https://api.themoviedb.org/3/account/${accountID}/watchlist`;

      const queryParams = `?session_id=${encodeURIComponent(sessionID)}`;

      const response = await axios.post(
        url + queryParams,
        {
          media_type: type,
          media_id: id,
          watchlist: watchlistStatus,
        },
        config
      );
      const data = response.data;

      console.log("Data", data);
      setWatchlistLoading(false);
      setWatchlist(watchlistStatus);
      const sucessMessage = watchlistStatus
        ? "Watchlist::Label::Add::Success"
        : "Watchlist::Label::Remove::Success";
      showAlert(sucessMessage, "success");
    } catch (error) {
      console.log(error);
      const errorMessage = watchlistStatus
        ? "Watchlist::Label::Add::Error"
        : "Watchlist::Label::Remove::Error";
      setWatchlistLoading(false);
      showAlert(errorMessage, "error");
    }
  }

  return (
    <div id={style.details_container}>
      {isLoading ? (
        <div id={style.details_loading}>
          <CircularProgress />
          <div>{getTranslation("Common::Label::Loading")}</div>
        </div>
      ) : errorMsg != null ? (
        <div id={style.details_error}>{errorMsg}</div>
      ) : details == null ? (
        <div id={style.details_empty}>
          {type === CONTENT_TYPE_MOVIE
            ? getTranslation("Common::Label::Movie::NotFound")
            : getTranslation("Common::Label::Serie::NotFound")}
        </div>
      ) : (
        <>
          <div id={style.details_content}>
            <img
              id={style.details_img}
              src={
                image != null
                  ? `https://image.tmdb.org/t/p/w500${image}`
                  : IMAGE_DEFAULT
              }
              alt={title}
              title={title}
            />
            <div id={style.details_content_principal}>
              <h2 id={style.details_title}>{title}</h2>
              <p id={style.details_overview}>{details.overview}</p>
              <div className={style.details_lancamento}>
                <span className={style.details_info}>
                  {getTranslation("Common::Label::Realise") + ": "}
                </span>
                {details.release_date ?? details.first_air_date}
              </div>
              <div className={style.details_vote_count}>
                <span className={style.details_info}>
                  {getTranslation("Common::Label::Votes::Count") + ": "}
                </span>
                {details.vote_count}
              </div>
              <div id={style.details_vote_average}>
                <Rating
                  readOnly
                  defaultValue={details.vote_average}
                  max={10}
                  precision={0.1}
                />{" "}
                (
                {Math.round(
                  ((details.vote_average ?? 0) + Number.EPSILON) * 10
                ) / 10}
                )
              </div>
              <div className={style.details_popularity}>
                <span className={style.details_info}>
                  {getTranslation("Common::Label::Popularity") + ": "}
                </span>
                {details.popularity}
              </div>
              <div id={style.details_genres}>
                <span className={style.details_info}>
                  {getTranslation("Common::Label::Genres") + ": "}
                </span>
                {details.genres.map(GetGenreLabel)}
              </div>
              <div id={style.details_actions}>
                {favoriteLoading ? (
                  <CircularProgress />
                ) : favorite ? (
                  <MdFavorite
                    className={style.details_actions_icon}
                    onClick={ToggleFavorite}
                    color="red"
                  />
                ) : (
                  <MdFavoriteBorder
                    className={style.details_actions_icon}
                    onClick={ToggleFavorite}
                    color="red"
                  />
                )}
                {watchlistLoading ? (
                  <CircularProgress />
                ) : watchlist ? (
                  <MdOutlinePlaylistRemove
                    className={style.details_actions_icon}
                    onClick={ToggleWatchList}
                  />
                ) : (
                  <MdPlaylistAdd
                    className={style.details_actions_icon}
                    onClick={ToggleWatchList}
                  />
                )}
                {ratingLoading ? (
                  <CircularProgress />
                ) : (
                  <MdStar
                    className={style.details_actions_icon}
                    color={rated ? "gold" : null}
                    onClick={showRatingDialog}
                  />
                )}
                <CiBookmarkPlus className={style.details_actions_icon} />
              </div>
              {video != null ? (
                <iframe
                  id={style.details_video_trailer}
                  src={`https://www.youtube.com/embed/${video}`}
                ></iframe>
              ) : null}
            </div>
            <RatingDialog
              id={id}
              type={type}
              rating={rating}
              ratingDialogOpen={ratingDialogOpen}
              ratingDialogTitle={(type === CONTENT_TYPE_MOVIE
                ? getTranslation("Rating::Label::Movie")
                : getTranslation("Rating::Label::Serie")
              ).replace("{0}", title)}
              ratingDialogCancelButton={getTranslation("Common::Label::Cancel")}
              ratingDialogCancelButtonAction={closeRatingDialog}
              ratingDialogConfirmButton={getTranslation(
                "Rating::Label::Button"
              )}
              ratingDialogConfirmButtonAction={ratingDialogConfirmButtonAction}
              ratingDialogCloseAction={closeRatingDialog}
            />
          </div>
          <Comments id={id} type={type} />
        </>
      )}
    </div>
  );
}
