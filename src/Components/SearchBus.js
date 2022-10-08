import React from "react";
import { useContext, useState } from "react";
import searchContext from "../context/search/searchContext";

export default function SearchBus() {
  const context = useContext(searchContext);
  const { searchBus } = context;
  const [search, setSearch] = useState({
    source: "",
    destination: "",
    trip_date: "",
  });
  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    console.log(search.source, search.destination, search.trip_date);
    searchBus(search.source, search.destination, search.trip_date);
  };
  return (
    <>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="container mt-5">
            <form action="">
              <div className="row no-gutters">
                <div className="col-md">
                  <a className="card text-secondary w-100 mb-2 d-block border-left-radius border-right-0">
                    <div className="car-body p-0 align-items-center">
                      <div className="row align-items-center justify-content-start no-gutters">
                        <div
                          className="col-auto"
                          style={{ paddingLeft: "21px", paddingRight: "0px" }}
                        >
                          <img
                            src="https://static.abhibus.com/assets/img/pointer-1.png"
                            alt="source pointer"
                          />
                        </div>
                        <div className="col pt-2">
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              className="form-control border-0 mb-0 ui-autocomplete-input"
                              autoComplete="off"
                              name="source"
                              id="source"
                              onChange={onChange}
                              value={search.source}
                              required
                            />
                            <label htmlFor="input" className="control-label">
                              Leaving from
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-auto" id="edittwoway">
                  <div className="twowaychang-new">
                    <a className="twowaychang">
                      <img
                        src="https://static.abhibus.com/assets/img/twoway.png"
                        alt="two way"
                        width="30px"
                        style={{ position: "relative", zIndex: 10 }}
                      />
                    </a>
                  </div>
                </div>
                <div className="col-md">
                  <a
                    className="card rounded-0 text-secondary w-100 mb-2 d-block border-left-0"
                    style={{ marginLeft: "-1px" }}
                  >
                    <div className="car-body p-0 align-items-center">
                      <div className="row align-items-center justify-content-start no-gutters">
                        <div
                          className="col-auto pl-1"
                          style={{ paddingLeft: "21px", paddingRight: "0px" }}
                        >
                          <img
                            src="https://static.abhibus.com/assets/img/pointer-2.png"
                            alt="destination pointer"
                          />
                        </div>
                        <div className="col pt-2">
                          <div className="form-group mb-0">
                            <input
                              className="form-control border-0 mb-0 ui-autocomplete-input"
                              autoComplete="off"
                              name="destination"
                              id="destination"
                              type="text"
                              value={search.destination}
                              onChange={onChange}
                              tabIndex="2"
                              required
                            />
                            <label htmlFor="input" className="control-label">
                              Going to
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md" style={{ marginLeft: "-26px" }}>
                  <a
                    className="card rounded-0 text-secondary w-100 mb-2 d-block"
                    style={{ marginLeft: "-2px", marginRight: "-2px" }}
                  >
                    <div className="car-body p-0 align-items-center">
                      <div className="row align-items-center justify-content-start no-gutters">
                        <div
                          className="col-auto"
                          style={{ paddingLeft: "21px", paddingRight: "0px" }}
                        >
                          <img
                            src="https://static.abhibus.com/assets/img/date.png"
                            alt="destination pointer"
                          />
                        </div>
                        <div className="col pt-2">
                          <div className="form-group mb-0">
                            <input
                              className="form-control border-0 mb-0 hasDatepicker"
                              type="date"
                              name="trip_date"
                              id="datepicker1"
                              onChange={onChange}
                              value={search.trip_date}
                              tabIndex="3"
                              required
                            />
                            <label htmlFor="input" className="control-label">
                              Date of Journey
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-auto" style={{ marginLeft: "-26px" }}>
                  <button
                    tabIndex="4"
                    type="button"
                    className="btn btn-primary px-5 py-4 border-right-radius"
                    onClick={handleClick}
                    style={{ height: "70px" }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
