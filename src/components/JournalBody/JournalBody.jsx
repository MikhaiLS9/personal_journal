import styles from "./JournalBody.module.css";

// eslint-disable-next-line react/prop-types
function JournalBody({ children }) {
  return <div className={styles.journal_body}>{children}</div>;
}

export default JournalBody;
