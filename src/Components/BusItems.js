import React from "react";
import fareCal from "../fareCal";
import { Link } from "react-router-dom";
import { useContext } from "react";
import reservationContext from "../context/reservation/reservationContext";


export default function BusItems(props) {
  const { bus, search } = props;

  function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  let dpTime = bus.sd_time;
  dpTime = Number(dpTime.replace(":", "."));

  let boarding_points = bus.route_id.boarding_points;
  let alighting_points = bus.route_id.alighting_points;
  let dKm = alighting_points[alighting_points.length - 1].aKm;
  console.log(dKm);
  let bKm, aKm;
  boarding_points.forEach((ele) => {
    if (ele.name === search.source) {
      bKm = ele.bKm;
    }
  });
  alighting_points.forEach((ele) => {
    if (ele.name === search.destination) {
      aKm = ele.aKm;
    }
  });

  let tKm = aKm - bKm;
  let destTime = Math.round(dKm * 2);
  destTime = toHoursAndMinutes(destTime);
  destTime = Number(destTime.replace(":", "."));
  destTime += dpTime;
  destTime = destTime.toFixed(2).replace(".", ":");
  let journeyDur = Math.round(tKm * 2);
  journeyDur = toHoursAndMinutes(journeyDur);
  let bTime = Math.round(bKm * 2);
  bTime = toHoursAndMinutes(bTime);
  bTime = Number(bTime.replace(":","."));
  bTime += dpTime;
  bTime = bTime.toFixed(2).replace(".",":")

  let aTime = Math.round(aKm * 2);
  aTime = toHoursAndMinutes(aTime);
  aTime = Number(aTime.replace(":","."));
  aTime += dpTime;
  aTime = aTime.toFixed(2).replace(".",":")

  let fare = 0;
  fare = fareCal(tKm);

  const context = useContext(reservationContext);
  const { setRev, searchTrip } = context;

  const handleRev = ()=>{
    searchTrip(bus._id);
    setRev({
      trip_id: bus._id,
      book_seats_no: bus.book_seats_no,
      service_type: bus.bus_id.service_type,
      source: bus.route_id.source,
      sd_time: bus.sd_time,
      destination: bus.route_id.destination,
      destTime,
      boarding_point: search.source,
      bTime,
      alighting_point: search.destination,
      aTime,
      journeyDur,
      fare,
      availability:bus.availability,
     })
  }
  
  return (
    <div className="card w-90" style={{ margin: "4px auto" }}>
      <div className="card-body">
        <div className="lh-24 f-bold p-1 service-type">{bus.bus_id.service_type}</div>
        <div className="d-flex justify-content-between">
          <div className="p-1 w-10 row-one">
            <div className="lh-24 f-bold">{bus.route_id.source}</div>
            <div className="f-12 mt-1 text-secondary">{bus.sd_time}</div>
            <div className="lh-24 f-bold mt-2">{bus.route_id.destination}</div>
            <div className="f-12 mt-1 text-secondary">{destTime}</div>
          </div>
          <div className="p-1 w-10 row-two">
            <div className="lh-24 f-bold">{search.source}</div>
            <div className="f-12 mt-1 text-secondary">{bTime}</div>
            <div className="lh-24 f-bold mt-2">{search.destination}</div>
            <div className="f-12 mt-1 text-secondary">{aTime}</div>
          </div>
          <div className="p-1 w-10 row-three">
            <div className="lh-24 f-bold">Journey Duration</div>
            <div className="f-12 mt-1 text-secondary">{journeyDur}</div>
          </div>
          <div className="p-1 w-10 row-four">
            <div className="lh-24 f-bold">Fare</div>
            <div className="f-12 mt-1 text-secondary">INR {fare}</div>
          </div>
          <div className="p-1 w-10 row-five">
            <div className="lh-24 f-bold">Availability</div>
            <div className="f-12 mt-1 text-secondary">{bus.availability}</div>
          </div>
          <div className="p-1 w-10 row-six">
            <Link className="btn btn-primary" to='/reservationForm' onClick={()=>{handleRev()}}>Book Ticket</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
