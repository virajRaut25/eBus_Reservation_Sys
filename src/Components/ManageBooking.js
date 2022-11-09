import React from "react";
import { useContext } from "react";
import reservationContext from "../context/reservation/reservationContext";

export default function ManageBooking() {
  const context = useContext(reservationContext);
  const { getReserve } = context;
  const reservations = getReserve();

  return (
    <div>
      <div className="text-center my-4">Manage Booking</div>
      {/* {reservations.map((reservation, index) => {
        return (
          <div key={index}>
            <span>{reservation._id}</span>
            <span>Date of Journey</span>
            <span>Trip Id</span>
          </div>
        );
      })} */}
    </div>
  );
}
