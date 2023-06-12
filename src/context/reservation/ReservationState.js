import { useState } from "react";
import ReservationContext from "./reservationContext";

const ReservationState = (props) => {
  const host = "http://localhost:5000";
  // const [tripDetails, setTripDetails] = useState([]);
  const [pass, setPass] = useState(null);
  const [reserve, setReserve] = useState({});
  const [bookings, setBookings] = useState([]);
  const [receipt, setReceipt] = useState({});
  const [tripInfo, setTripInfo] = useState({});
  // Search Bus
  // const searchTrip = async (id) => {
  //   const response = await fetch(`${host}/api/user/tripDetails`, {
  //     method: "POST",
  //     headers: {
  //       "auth-token": localStorage.getItem("token"),
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: id }),
  //   });
  //   const tripRes = await response.json();
  //   setTripDetails(tripRes);
  // };

  // Get Trip Info
  const getInfo = async (source, destination, trip_id) => {
    const response = await fetch(`${host}/api/search/info/${trip_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, destination }),
    });
    const info = await response.json();
    setTripInfo(info);
    return info;
  };

  // Make Reservation
  const makeReservation = async (
    id,
    boarding_point,
    b_time,
    alighting_point,
    a_time,
    passenger_list,
    fare
  ) => {
    const response = await fetch(`${host}/api/user/book/${id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boarding_point,
        b_time,
        alighting_point,
        a_time,
        passenger_list,
        fare,
      }),
    });
    const res = await response.json();
    setReserve(res);
    return res;
  };

  // Cancel Reservation(booking)
  const cancelBooking = async (rev_id) => {
    const response = await fetch(`${host}/api/user/cancel/${rev_id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
  };

  // Get Reservation Details
  const getReserve = async () => {
    const response = await fetch(`${host}/api/user/reservationDetails`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const book = await response.json();
    setBookings(book);
  };

  return (
    <ReservationContext.Provider
      value={{
        reserve,
        makeReservation,
        getReserve,
        pass,
        setPass,
        bookings,
        receipt,
        setReceipt,
        getInfo,
        tripInfo,
        cancelBooking,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;
