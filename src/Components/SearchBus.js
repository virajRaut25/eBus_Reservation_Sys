import React from "react";
import { useContext, useState } from "react";
import "../searchBar.css";
import searchContext from "../context/search/searchContext";
import { Link } from "react-router-dom";

export default function SearchBus() {
  const context = useContext(searchContext);
  const { searchBus, setLoading } = context;
  const [search, setSearch] = useState({
    source: "",
    destination: "",
    trip_date: "",
  })
  setLoading(true);
  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const captalize = (word)=>{
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  const handleClick = () => {
    let source = captalize(search.source);
    let destination = captalize(search.destination);
    searchBus(source, destination, search.trip_date);
    setLoading(false);
  };
  return (
    <>
      <div className="justify-content-center d-none d-md-block d-lg-block main-bg-sec"></div>
      <div className="container-fluid p-0">
        <div className="row justify-content-center no-gutters">
          <div className="col pt-5">
            <h1 className="text-center search-head">Book Bus Tickets</h1>
            <div className="searchBus">
              <div className="input-group">
                <div className="form-floating">
                  <span className="icon">
                    <img
                      src="https://static.abhibus.com/assets/img/pointer-1.png"
                      alt="source pointer"
                    />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingSource"
                    placeholder="Mumbai"
                    name="source"
                    value={search.source}
                    onChange={onChange}
                  />
                  <label htmlFor="floatingSource">From</label>
                </div>
                <div className="form-floating">
                  <span className="icon">
                    <img
                      src="https://static.abhibus.com/assets/img/pointer-2.png"
                      alt="destination pointer"
                    />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingDestination"
                    placeholder="Pune"
                    name="destination"
                    value={search.destination}
                    onChange={onChange}
                  />
                  <label htmlFor="floatingDestination">To</label>
                </div>
                <div className="form-floating">
                  <span className="icon">
                    <img
                      src="https://static.abhibus.com/assets/img/date.png"
                      alt="Calender"
                    />
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="floatingDate"
                    placeholder="Date"
                    name="trip_date"
                    value={search.trip_date}
                    onChange={onChange}
                  />
                  <label htmlFor="floatingDate">Journey Date</label>
                </div>
                <Link
                  role="button"
                  to="/searchResult"
                  className="btn btn-danger"
                  onClick={handleClick}
                  type="button"
                >
                  Search Buses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
