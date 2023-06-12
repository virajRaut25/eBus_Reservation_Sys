import React from "react";
// import fareCal from "../fareCal";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import reservationContext from "../context/reservation/reservationContext";
import { useState, useEffect } from "react";

export default function BusItems(props) {
  const { bus, search } = props;
  const context = useContext(reservationContext);
  const { getInfo } = context;
  const [info, setinfo] = useState({});
  let navigate = useNavigate();
  const { source, destination } = search;

  useEffect(() => {
    fetch(`http://localhost:5000/api/search/info/${bus._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, destination }),
    })
      .then((response) => response.json())
      .then((json) => setinfo(json));
    // eslint-disable-next-line
  }, [bus._id]);

  const handleRev = async () => {
    if (!localStorage.getItem("token")) {
      alert("Sign In to Book Ticket");
      navigate("/signIn");
    } else {
      // await searchTrip(bus._id);
      await getInfo(source, destination, bus._id);
      navigate("/reservationForm");
    }
  };

  return (
    <div className="card w-90" style={{ margin: "1rem auto" }}>
      <div className="card-body">
        <div className="lh-24 f-bold p-1 service-type">
          {bus.bus_id.service_type}
        </div>
        <div className="d-flex justify-content-between">
          <div className="p-1 w-10 row-one">
            <div className="lh-24 f-bold">{bus.route_id.source}</div>
            <div className="f-12 mt-1 text-secondary">{bus.sd_time}</div>
            <i className="arrow"></i>
            <div className="lh-24 f-bold mt-2">{bus.route_id.destination}</div>
            <div className="f-12 mt-1 text-secondary">{info.destTime}</div>
          </div>
          <div className="p-1 w-10 row-two">
            <div className="lh-24 f-bold">{search.source}</div>
            <div className="f-12 mt-1 text-secondary">{info.bTime}</div>
            <i className="arrow"></i>
            <div className="lh-24 f-bold mt-2">{search.destination}</div>
            <div className="f-12 mt-1 text-secondary">{info.aTime}</div>
          </div>
          <div className="p-1 w-10 row-three">
            <div className="lh-24 f-bold">Journey Duration</div>
            <div className="f-12 mt-1 text-secondary">{info.journeyDur}</div>
          </div>
          <div className="p-1 w-10 row-four">
            <div className="lh-24 f-bold">Fare</div>
            <div className="f-12 mt-1 text-secondary">INR {info.fare}</div>
          </div>
          <div className="p-1 w-10 row-five">
            <div className="lh-24 f-bold">Availability</div>
            <div className="f-12 mt-1 text-secondary">{bus.availability}</div>
          </div>
          <div className="p-1 w-10 row-six">
            <button
              className="btn btn-danger"
              onClick={() => {
                handleRev();
              }}
            >
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
