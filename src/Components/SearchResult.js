import React from "react";
import { useContext } from "react";
import searchContext from "../context/search/searchContext";
import BusItems from "./BusItems";

export default function SearchResult() {
  const context = useContext(searchContext);
  const { search, searchRes } = context;
  return (
    <div className="my-3">
      <h2>Available Buses</h2>
      <div className="container">
        {searchRes.length === 0 && "Not Available"}
      </div>
      {searchRes.map((sbus, index) => {
        return <BusItems key={index} bus={sbus} search={search} />;
      })}
    </div>
  );
}
