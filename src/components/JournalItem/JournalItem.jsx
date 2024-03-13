/* eslint-disable react/prop-types */

import CartBtn from "../CartBtn/CartBtn";
import "./JournalItem.css";
import { useContext, useMemo } from "react";
import { UserContext } from "../context/user.context";

function JournalItem({ data, setItem }) {
  const { userId } = useContext(UserContext);

  const filterData = useMemo(
    () =>
      data.filter((item) => item.userId === userId).sort((a, b) => b.id - a.id),
    [data, userId]
  );

  return (
    <div className="journal-item">
      {!data.length ? (
        <p>Добавьте новую заметку</p>
      ) : (
        filterData.map((item) => {
          const list = {
            id: item.id,
            post: item.post,
            date: item.date
              ? new Date(item.date).toLocaleDateString()
              : item.date,
            title: item.title,
          };

          return (
            <CartBtn key={list.id} onClick={() => setItem(list)}>
              <h2 className="journal-item__header">{list.title}</h2>
              <div className="journal-item__body">
                <div className="journal-item__date">{list.date}</div>
                <div className="journal-item__text">{list.post}</div>
              </div>
            </CartBtn>
            //
          );
        })
      )}
    </div>
  );
}

export default JournalItem;
