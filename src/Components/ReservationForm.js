import React from "react";
import { useContext, useRef, useEffect, useState } from "react";
import reservationContext from "../context/reservation/reservationContext";
import PassengerDetails from "./PassengerDetails";
export default function ReservationForm() {
  const context = useContext(reservationContext);
  const { rev, tripDetails } = context;
  const seats = document.querySelectorAll(
    ".frontSeats .seat:not(.occupied), .backSeats .seat:not(.occupied)"
  );

  const [seatIndex, setSeatIndex] = useState([]);
  const ref = useRef(null);
  useEffect(
    () => {
      const orgSeat = document.querySelectorAll(
        ".frontSeats .seat, .backSeats .seat"
      );
      console.log(tripDetails.book_seats_no);
      const booked_seats = tripDetails.book_seats_no;
      if (booked_seats !== null && booked_seats.length > 0) {
        orgSeat.forEach((seat, index) => {
          if (booked_seats.indexOf(index) > -1) {
            seat.classList.add("occupied");
          }
        });
      }
    },
    // eslint-disable-next-line
    [tripDetails]
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
          setSeatIndex(tempIndex);
          console.log(seatIndex);
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
            <div className="f-12 mt-1 text-secondary">{rev.availability}</div>
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
            <form action="" method="post">
              {seatIndex.map((seatNo, index) => {
                return <PassengerDetails index={index} seatNo={seatNo} />;
              })}
              <button
                type="submit"
                className="btn btn-primary"
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
