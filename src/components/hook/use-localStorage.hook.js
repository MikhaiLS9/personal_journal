import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [localParseData, setlocalParseData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setlocalParseData(parsedData);
    }
  }, []);

  const SavelocalParseData = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setlocalParseData(data);
  };

  return [localParseData, SavelocalParseData];
}
