/* eslint-disable react/prop-types */
import { useContext, useEffect, useReducer, useRef } from "react";
import Button from "../Button/Button";
import { UserContext } from "../context/user.context";
import styles from "./JournalBodyForm.module.css";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";

// eslint-disable-next-line react/prop-types
function JournalBodyForm({ onSubmit, data, deleteSub }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadytoSub, values } = formState;

  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const postRef = useRef();
  const formRef = useRef();

  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
      dispatchForm({
        type: "POPULATE_FORM",
        payload: { ...data, userId },
      });
    } else {
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({ type: "CLEAR" });
    dispatchForm({
      type: "POPULATE_FORM",
      payload: { ...data, userId },
    });
  }, [data, userId]);

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.post || !isValid.date || !isValid.text)
      focusError(isValid);
    timerId = setTimeout(() => {
      dispatchForm({ type: "RESET_VALIDITY" });
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadytoSub) {
      dispatchForm({ type: "CLEAR" });
      onSubmit(values);
      dispatchForm({ type: "RESET_VALIDITY" });
      dispatchForm({
        type: "POPULATE_FORM",
        payload: { ...data, userId },
      });
    }
  }, [isFormReadytoSub, userId]);

  const addJournalItem = (e) => {
    e.preventDefault();

    dispatchForm({ type: "SUBMIT" });
  };

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const deleteJournalItem = () => {
    deleteSub(data.id);

    dispatchForm({ type: "SUBMIT", payload: { userId } });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
    dispatchForm({
      type: "POPULATE_FORM",
      payload: { ...data, userId },
    });
    dispatchForm({ type: "CLEAR" });
  };

  const a = (date) => {
    if (!date) return "";

    if (date.startsWith("--")) {
      const formattedDate = date.slice(2);
      return formattedDate;
    }

    const parts = date.split(".");
    if (parts.length === 3) {
      const formattedDate = [parts[2], parts[1], parts[0]].join("-");
      return formattedDate;
    }

    return date;
  };

  return (
    <>
      <form
        ref={formRef}
        className={styles.journal_form}
        onSubmit={addJournalItem}
      >
        <div className={styles.div_styled_title}>
          <input
            ref={titleRef}
            className={!isValid.title ? `${styles.active}` : ""}
            type="text"
            name="title"
            placeholder="Имя заметки"
            value={values.title}
            onChange={onChange}
          />
          {data?.id && (
            <button
              onClick={(e) => deleteJournalItem(e)}
              className={styles.delete}
              type="button"
            >
              <img
                className={styles.img}
                src="src\assets\cart.svg"
                alt="sdas"
              />
            </button>
          )}
        </div>

        <div className={styles.styled_label}>
          <label
            onClick={() => dateRef.current.focus()}
            htmlFor="date"
            className={styles["form-label"]}
          >
            <img
              src="src\assets\calendar.svg"
              alt="Иконка календаря"
              className={styles.img}
            />
          </label>
          <input
            ref={dateRef}
            type="date"
            name="date"
            id="date"
            className={!isValid.date ? `${styles.active}` : ""}
            value={values.date ? a(values.date) : ""}
            onChange={onChange}
          />
        </div>

        <div className={styles.styled_label}>
          <label
            onClick={() => textRef.current.focus()}
            htmlFor="text"
            className={styles["form-label"]}
          >
            <img
              src="src\assets\folder.svg"
              alt="Иконка папки"
              className={styles.img}
            />
          </label>
          <input
            ref={textRef}
            type="text"
            name="text"
            id=""
            placeholder="Тема"
            className={!isValid.text ? `${styles.active}` : ""}
            value={values.text}
            onChange={onChange}
          />
        </div>

        <textarea
          ref={postRef}
          name="post"
          id=""
          cols="30"
          rows="10"
          placeholder="Текс"
          className={!isValid.post ? `${styles.active}` : ""}
          value={values.post}
          onChange={onChange}
        ></textarea>
        <Button text="Сохранить" />
      </form>
    </>
  );
}

export default JournalBodyForm;
