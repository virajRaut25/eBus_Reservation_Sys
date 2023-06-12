import React from "react";
import { useContext, useState, useEffect } from "react";
import "../searchBar.css";
import searchContext from "../context/search/searchContext";
import { useNavigate } from "react-router-dom";

export default function SearchBus() {
  let navigate = useNavigate();
  const context = useContext(searchContext);
  const { searchBus, setLoading } = context;
  const [search, setSearch] = useState({
    source: "",
    destination: "",
    trip_date: "",
  });
  setLoading(true);
  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const captalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let source = captalize(search.source);
    let destination = captalize(search.destination);
    await searchBus(source, destination, search.trip_date);
    await setLoading(false);
    navigate("/searchResult");
  };

  useEffect(() => {
    let dtToday = new Date();
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    let maxDate = year + "-" + month + "-" + day;
    document.getElementById("floatingDate").setAttribute("min", maxDate);
  }, []);

  return (
    <>
      <div className="justify-content-center d-none d-md-block d-lg-block main-bg-sec"></div>
      <div className="container-fluid p-0">
        <div className="row justify-content-center no-gutters">
          <div className="col pt-5">
            <h1 className="text-center search-head">Book Bus Tickets</h1>
            <form className="searchBus" onSubmit={handleSubmit}>
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
                    required
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
                    required={true}
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
                    required={true}
                  />
                  <label htmlFor="floatingDate">Journey Date</label>
                </div>
                <button
                  className="btn btn-danger"
                  type="submit"
                  style={{
                    padding: "12px",
                  }}
                >
                  Search Buses
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
