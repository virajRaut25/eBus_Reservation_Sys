import { useState } from "react";
import SearchContext from "./searchContext";

const SearchState = (props) => {
  const host = "http://localhost:5000";
  const [searchRes, setSearchRes] = useState([]);
  // Search Bus
  const searchBus = async (source, destination, trip_date) => {
    const response = await fetch(`${host}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, destination, trip_date }),
    });
    const sres = await response.json();
    setSearchRes(sres);
  };
  return (
    <SearchContext.Provider value={{ searchRes, searchBus }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
