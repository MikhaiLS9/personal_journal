/* eslint-disable react/prop-types */
import styles from "./AddNote.module.css";

function AddNote({ clearForm }) {
  return (
    <button
      className={`${styles.button} ${styles.plus}`}
      onClick={clearForm}
    >
      Новая заметка
    </button>
  );
}

export default AddNote;
