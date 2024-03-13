import { useState } from "react";
import styles from "./EnterUserName.module.css";

// eslint-disable-next-line react/prop-types
function EnterUserName({ onSubmit }) {
  const [clouseBtn, setClouseBtn] = useState(true);

  const handleHideBtn = () => {
    setClouseBtn(!clouseBtn);
  };

  const createNewProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    if (formProps.name.trim()) {
      onSubmit(formProps);
      setClouseBtn(!clouseBtn);
    }
  };

  const handleClickBack = () => {
    setClouseBtn(!clouseBtn);
  };

  return clouseBtn ? (
    <button onClick={handleHideBtn} className={styles.button}>
      Создать новый Профиль
    </button>
  ) : (
    <form action="" onSubmit={createNewProfile} className={styles.formStyle}>
      <input type="text" name="name" id="1" className={styles.input} placeholder="Новый профиль"/>
      <span className={styles.toggleBtnStyled}>
        <button className={`${styles.button} ${styles.toggleBtn}`}>
          Создать
        </button>
        <button
          onClick={handleClickBack}
          className={`${styles.button} ${styles.toggleBtn}`}
        >
          Назад
        </button>
      </span>
    </form>
  );
}
export default EnterUserName;
