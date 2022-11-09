import React from "react";
import { useContext } from "react";
import searchContext from "../context/search/searchContext";
import BusItems from "./BusItems";
import Spinner from "./Spinner";

export default function SearchResult() {
  const context = useContext(searchContext);
  const { search, searchRes, loading } = context;
  return (
    <div className="my-5">
      <h2 className="text-center">Available Buses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="container mt-4">
            {searchRes.length === 0 && "Not Available"}
          </div>
          {searchRes.map((sbus, index) => {
            return <BusItems key={index} bus={sbus} search={search} />;
          })}{" "}
        </div>
      )}
    </div>
  );
}
