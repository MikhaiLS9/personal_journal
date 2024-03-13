import JournalItem from "./components/JournalItem/JournalItem";
import ListNotes from "./components/ListNotes/ListNotes";
import AddNote from "./components/AddNote/AddNote";
import JournalBody from "./components/JournalBody/JournalBody";
import Header from "./components/Header/Header";
import JournalBodyForm from "./components/JournalBodyForm/JournalBodyForm";
import { useLocalStorage } from "./components/hook/use-localStorage.hook";
import { UserContextProvider } from "./components/context/user.context";

import "./App.css";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
  }));
}

function App() {
  const [journalData, setJournalData] = useLocalStorage("data");
  const [addUserData, setUserData] = useLocalStorage("user");
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setJournalData([
        ...mapItems(journalData),
        {
          ...item,
          date: new Date(item.date),
          id:
            journalData.length > 0
              ? Math.max(...journalData.map((i) => i.id)) + 1
              : 1,
        },
      ]);
    } else {
      setJournalData([
        ...mapItems(journalData).map((i) => {
          if (i.id === item.id) {
            return {
              ...item,
            };
          }
          return i;
        }),
      ]);
    }
  };

  const createProfile = (item) => {

    setUserData([
      ...addUserData,
      {
        id: addUserData.length
          ? Math.max(...addUserData.map((i) => i.id)) + 1
          : 1,
        name: item.name,
      },
    ]);
  };

  const deleteSub = (id) => {
    setJournalData([...journalData.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <ListNotes>
        <Header onSubmit={createProfile} addUser={addUserData} />
        <AddNote clearForm={() => setSelectedItem(null)} />
        <JournalItem data={journalData} setItem={setSelectedItem} />
      </ListNotes>

      <JournalBody>
        <JournalBodyForm
          onSubmit={addItem}
          data={selectedItem}
          deleteSub={deleteSub}
        />
      </JournalBody>
    </UserContextProvider>
  );
}

export default App;
