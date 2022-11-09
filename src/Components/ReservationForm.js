import React from "react";
import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reservationContext from "../context/reservation/reservationContext";
export default function ReservationForm() {
  let navigate = useNavigate();
  const context = useContext(reservationContext);
  const { rev, tripDetails, setPass, makeReservation } = context;
  const seats = document.querySelectorAll(
    ".frontSeats .seat, .backSeats .seat"
  );
  const [seatIndex, setSeatIndex] = useState([]);
  const ref = useRef(null);
  const passengerTemplate = { name: "", age: "", gender: "", seat_no: "" };
  const [passDetails, setPassDetails] = useState([]);
  const onChange = (event, index) => {
    let data = [...passDetails];
    data[index][event.target.name] = event.target.value;
    setPassDetails(data);
  };
  const addPassenger = () => {
    setPassDetails([...passDetails, passengerTemplate]);
  };
  const removePassenger = (index) => {
    const filteredPassenger = [...passDetails];
    filteredPassenger.splice(index, 1);
    setPassDetails(filteredPassenger);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(seatIndex);
    for (let i = 0; i < seatIndex.length; i++) {
      passDetails[i].seat_no = seatIndex[i];
    }
    console.log(passDetails);
    makeReservation(rev.trip_id, rev.boarding_point, rev.alighting_point, passDetails);
    setPass(passDetails);
    navigate("/receipt");
  };
  useEffect(
    () => {
      try {
        const booked_seats = tripDetails.book_seats_no;
        if (booked_seats !== null && booked_seats.length > 0) {
          seats.forEach((seat, index) => {
            if (booked_seats.indexOf(index) > -1) {
              seat.classList.add("occupied");
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // eslint-disable-next-line
    [tripDetails.book_seats_no]
  );
  useEffect(
    () => {
      const handleClick = (e) => {
        if (
          e.target.classList.contains("seat") &&
          !e.target.classList.contains("occupied")
        ) {
          e.target.classList.toggle("selected");
          const selectedSeats = document.querySelectorAll(
            ".frontSeats .seat.selected, .backSeats .seat.selected"
          );
          const tempIndex = [...selectedSeats].map((seat) =>
            [...seats].indexOf(seat)
          );
          if (tempIndex.at(-1) !== -1) {
            setSeatIndex(tempIndex);
          }
          if (e.target.classList.contains("selected")) {
            console.log("passenger Added");
            addPassenger();
          }
          if (!e.target.classList.contains("selected")) {
            removePassenger(tempIndex.length);
          }
          console.log(tempIndex);
          // localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
        }
      };
      const element = ref.current;
      element.addEventListener("click", handleClick);
      return () => {
        element.removeEventListener("click", handleClick);
      };
    },
    // eslint-disable-next-line
    [seatIndex]
  );

  return (
    <div className="main-container my-3">
      <div className="tripDetails">
        <h3 className="h3-primary">Trip Details</h3>
        <div className="lh-24 f-bold p-1 service-type">{rev.service_type}</div>
        <div className="d-flex justify-content-between">
          <div className="p-1 w-10 row-one">
            <div className="lh-24 f-bold">Service Start:</div>
            <div className="lh-24 f-bold">{rev.source}</div>
            <div className="f-12 mt-1 text-secondary">{rev.sd_time}</div>
            <div className="lh-24 f-bold mt-2">Service End:</div>
            <div className="lh-24 f-bold">{rev.destination}</div>
            <div className="f-12 mt-1 text-secondary">{rev.destTime}</div>
          </div>
          <div className="p-1 w-10 row-two">
            <div className="lh-24 f-bold">Boarding Point:</div>
            <div className="lh-24 f-bold">{rev.boarding_point}</div>
            <div className="f-12 mt-1 text-secondary">{rev.bTime}</div>
            <div className="lh-24 f-bold mt-2">Alighting Point:</div>
            <div className="lh-24 f-bold">{rev.alighting_point}</div>
            <div className="f-12 mt-1 text-secondary">{rev.aTime}</div>
          </div>
          <div className="p-1 w-10 row-three">
            <div className="lh-24 f-bold">Journey Duration</div>
            <div className="f-12 mt-1 text-secondary">{rev.journeyDur}</div>
          </div>
          <div className="p-1 w-10 row-four">
            <div className="lh-24 f-bold">Fare</div>
            <div className="f-12 mt-1 text-secondary">INR {rev.fare}</div>
          </div>
          <div className="p-1 w-10 row-five">
            <div className="lh-24 f-bold">Availability</div>
            <div className="f-12 mt-1 text-secondary">{tripDetails.availability}</div>
          </div>
        </div>
      </div>
      <div className="selectSeats">
        <h3 className="h3-primary">Select Seats</h3>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>
          <li>
            <div className="seat occupied"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <div className="bus-outline" ref={ref}>
          <div className="driver"></div>
          <div className="frontSeats">
            <div className="leftSeats">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>
            <div className="rightSeats">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>
          </div>
          <div className="backSeats">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
        </div>
      </div>
      {seatIndex.length > 0 ? (
        <div className="fillDetails">
          <h3 className="h3-primary">Fill Details</h3>
          <div className="form">
            <form onSubmit={handleSubmit}>
              {passDetails.map((form, index) => {
                return (
                  <div key={index}>
                    <div className="h4-primary mt-2 mb-2">
                      Passenger {index + 1}
                    </div>
                    <div className="row g-4">
                      <div className="input-group col-md">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInputGroup1"
                            placeholder="pasname"
                            onChange={(event) => onChange(event, index)}
                            value={form.name}
                            name="name"
                          />
                          <label htmlFor="floatingInputGroup1">Name</label>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            name="gender"
                            value={form.gender}
                            onChange={(event) => onChange(event, index)}
                            id="floatingSelectGrid"
                          >
                            <option value="Click on Arrow" defaultChecked>
                              Click on Arrow
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <label htmlFor="floatingSelectGrid">Gender</label>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="input-group col-md">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control"
                              id="floatingInputGroup1"
                              placeholder="Age"
                              value={form.age}
                              onChange={(event) => onChange(event, index)}
                              name="age"
                            />
                            <label htmlFor="floatingInputGroup1">Age</label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="input-group col-md">
                          <div className="form-floating">
                            <input
                              type="number"
                              onChange={(event) => onChange(event, index)}
                              className="form-control"
                              disabled
                              id="floatingPlaintextInput"
                              value={seatIndex[index]}
                            />
                            <label htmlFor="floatingPlaintextInput">
                              Seat Number
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button
                type="submit"
                className="btn btn-danger"
                style={{
                  display: "block",
                  margin: "25px auto",
                }}
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
