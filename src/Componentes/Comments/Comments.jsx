import style from "./Comments.module.css";
import React, { useEffect, useState, useContext } from "react";
import {
  LanguageContext,
  GlobalComponentsContext,
} from "../../Contexts/index.js";
import CircularProgress from "@mui/material/CircularProgress";
import { FaTrashCan } from "react-icons/fa6";
import { TiEdit } from "react-icons/ti";

function getComments(id, type) {
  const comments = localStorage.getItem(`comments::${type}::${id}`);
  if (comments) {
    return JSON.parse(comments);
  } else {
    return [];
  }
}

const genUUID = () => {
  return "uid-" + Math.random().toString(36).substr(2, 18);
};

function deleteComments(id, type, comments, commentID) {
  const cloneComments = [...comments];

  const idx = cloneComments.findIndex((c) => c.id === commentID);
  cloneComments.splice(idx, 1);

  localStorage.setItem(
    `comments::${type}::${id}`,
    JSON.stringify(cloneComments)
  );
  return cloneComments;
}

function updateComments(id, type, comments, commentID, comment) {
  const cloneComments = [...comments];

  const idx = cloneComments.findIndex((c) => c.id === commentID);
  cloneComments[idx] = comment;

  localStorage.setItem(
    `comments::${type}::${id}`,
    JSON.stringify(cloneComments)
  );
  return cloneComments;
}

function createComments(id, type, comments, comment) {
  const cloneComments = [...comments];

  const newComment = {
    ...comment,
    id: genUUID(),
    date: new Date(),
  };

  cloneComments.push(newComment);

  localStorage.setItem(
    `comments::${type}::${id}`,
    JSON.stringify(cloneComments)
  );
  return cloneComments;
}

export default function Comments({ id, type }) {
  const { getTranslation, language } = useContext(LanguageContext);
  const { showAlert, closeAlert, showDialog, closeDialog } = useContext(
    GlobalComponentsContext
  );
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    id: null,
    text: "",
    date: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const load = () => {
      try {
        setIsLoading(true);

        const data = getComments(id, type);
        setComments(data);

        setErrorMsg(null);
      } catch (err) {
        setErrorMsg(err.message ?? err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id, type]);

  return (
    <div className={style.comments}>
      {!isLoading && errorMsg == null ? (
        <div id={style.new_comment_container}>
          <input
            type="text"
            id={style.new_comment_input}
            value={comment.text}
            onChange={(event) =>
              setComment((d) => {
                return { ...d, text: event.target.value };
              })
            }
            placeholder={getTranslation("Common::Label::Comment")}
          />
          <button
            id={
              comment.text.trim().length !== 0
                ? style.new_comment_btn
                : style.new_comment_btn_disabled
            }
            disabled={comment.text.trim().length === 0}
            onClick={() => {
              try {
                if (comment.id == null) {
                  const clone = createComments(id, type, comments, comment);
                  setComments(clone);
                  showAlert(
                    getTranslation("Comments::Label::AddSuccess"),
                    "success"
                  );
                } else {
                  const clone = updateComments(
                    id,
                    type,
                    comments,
                    comment.id,
                    comment
                  );
                  setComments(clone);
                  showAlert(
                    getTranslation("Comments::Label::UpdateSuccess"),
                    "success"
                  );
                }
                setComment({
                  id: null,
                  text: "",
                  date: null,
                });
              } catch (err) {
                const error =
                  comment.id == null
                    ? getTranslation("Comments::Label::AddError")
                    : getTranslation("Comments::Label::UpdateError");
                showAlert(error, "error");
              }
            }}
          >
            {comment.id == null
              ? getTranslation("Common::Label::Add")
              : getTranslation("Common::Label::Update")}
          </button>
        </div>
      ) : null}
      {isLoading ? (
        <div className={style.comments_loading}>
          <CircularProgress />
          <div>{getTranslation("Common::Label::Loading")}</div>
        </div>
      ) : errorMsg != null ? (
        <div className={style.comments_error}>{errorMsg}</div>
      ) : comments === null || comments.length === 0 ? (
        <div className={style.comments_empty}>
          {getTranslation("Common::Label::EmptyList")}
        </div>
      ) : (
        <div className={style.comments_content_container}>
          <div className={style.comments_content}>
            {comments.map((cmt, idx) => (
              <div key={idx} className={style.comment}>
                <div className={style.comment_action}>
                  <TiEdit
                    className={style.comment_icon}
                    onClick={() => {
                      setComment(cmt);
                    }}
                  />
                  <FaTrashCan
                    className={style.comment_icon}
                    onClick={() => {
                      try {
                        const clone = deleteComments(
                          id,
                          type,
                          comments,
                          cmt.id
                        );
                        setComments(clone);
                        showAlert(
                          getTranslation("Comments::Label::DeleteSuccess"),
                          "success"
                        );
                      } catch (err) {
                        showAlert(
                          getTranslation("Comments::Label::DeleteError"),
                          "error"
                        );
                      }
                    }}
                  />
                </div>
                <div className={style.comment_main}>
                  <p className={style.info}>{cmt.text}</p>
                  <p className={style.info}>
                    {new Date(cmt.date).toLocaleString(language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
