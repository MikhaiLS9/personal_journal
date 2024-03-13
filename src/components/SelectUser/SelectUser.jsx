import styles from "./SelectUser.module.css";

import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/user.context";

// eslint-disable-next-line react/prop-types
function SelectUser({ addUser }) {
  const { userId, setUserId } = useContext(UserContext);
  const [userName, setUserName] = useState([]);
  const [confirm, setConfirm] = useState(true);
  const userRef = useRef();

  useEffect(() => {
    setUserName(addUser);
  }, [addUser]);

  const handleClickSelect = (e) => {
    setUserId(Number(e.target.value));
  };

  const handleDeleteUser = () => {
    const selectedIndex = userRef.current.selectedIndex;
    const userFilter = userName.filter(
      (item, index) => index !== selectedIndex
    );
    setUserName(userFilter);
    localStorage.setItem("user", JSON.stringify(userFilter));
    setConfirm(!confirm);
  };

  const hendleConfirm = () => {
    setConfirm(!confirm);
  };

  return (
    <>
      <select
        ref={userRef}
        name="user"
        id="user"
        value={userId}
        onChange={handleClickSelect}
        className={styles.select}
      >
        {userName.map((user) => (
          <option value={user.id} key={user.id} className={styles.option}>
            {user.name}
          </option>
        ))}
      </select>

      <button onClick={hendleConfirm} className={styles.button}>
        Удалить Профиль
      </button>
      {!confirm && (
        <div className={styles.confirm}>
          Вы точно хотите Удалить ?
          <span>
            
            <button
              onClick={handleDeleteUser}
              className={`${styles.button} ${styles.toggleBtn}`}
            >
              Удалить
            </button>
            <button
              onClick={hendleConfirm}
              className={`${styles.button} ${styles.toggleBtn}`}
            >
              Отменить
            </button>
          </span>
        </div>
      )}
    </>
  );
}

export default SelectUser;
