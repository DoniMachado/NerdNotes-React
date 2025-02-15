import Rating from "@mui/material/Rating";
import style from "./Card.module.css";
import { IMAGE_DEFAULT, getGenres } from "../../Utils";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../Contexts/index.js";
import { useNavigate } from "react-router-dom";

export default function Card({
  id,
  type,
  image,
  title,
  description,
  release_date,
  genres,
  vote_average,
  vote_count,
  popularity,
  AddGenreFilter,
}) {
  const { getTranslation } = useContext(LanguageContext);
  const navigate = useNavigate();

  function Navigate() {
    navigate(`/details/${type}/${id}`);
  }

  let currentGenreList = getGenres(type);

  function GetGenreLabel(element, index) {
    const item = currentGenreList.find((e) => e.value == element);

    if (item)
      return (
        <Chip
          className={style.card_genre_chip}
          key={index}
          label={getTranslation(item.label)}
          onClick={() => {
            if (AddGenreFilter) AddGenreFilter(item.value, item);
          }}
        />
      );
    else
      return <Chip className={style.card_genre_chip} key={index} label="-" />;
  }

  return (
    <div className={style.card}>
      <img
        className={style.card_img}
        src={
          image != null
            ? `https://image.tmdb.org/t/p/w500${image}`
            : IMAGE_DEFAULT
        }
        alt={title}
        title={title}
        onClick={Navigate}
      />
      <h2 className={style.card_title} onClick={Navigate}>
        {title}
      </h2>
      <div className={style.card_text_content}>
        <div className={style.card_descricao}>{description}</div>
        <div className={style.card_lancamento}>
          <span className={style.card_info}>
            {getTranslation("Common::Label::Realise") + ": "}
          </span>
          {release_date}
        </div>
        <div className={style.card_vote_count}>
          <span className={style.card_info}>
            {getTranslation("Common::Label::Votes::Count") + ": "}
          </span>
          {vote_count}
        </div>
        <div className={style.card_vote_average}>
          <Rating
            readOnly
            defaultValue={vote_average}
            max={10}
            precision={0.1}
          />{" "}
          ({Math.round(((vote_average ?? 0) + Number.EPSILON) * 10) / 10})
        </div>
        <div className={style.card_popularity}>
          <span className={style.card_info}>
            {getTranslation("Common::Label::Popularity") + ": "}
          </span>
          {popularity}
        </div>
        <div className={style.card_genres}>
          <span className={style.card_info}>
            {getTranslation("Common::Label::Genres") + ": "}
          </span>
          {genres.map(GetGenreLabel)}
        </div>
      </div>
    </div>
  );
}
