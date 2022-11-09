import { useState } from "react";
import ReservationContext from "./reservationContext";

const ReservationState = (props) => {
  const host = "http://localhost:5000";
  const [tripDetails, setTripDetails] = useState([]);
  const [pass, setPass] = useState(null);
  const [rev, setRev] = useState({});
  const [reserve, setReserve] = useState({});
  // Search Bus
  const searchTrip = async (id) => {
    const response = await fetch(`${host}/api/user/tripDetails`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const tripRes = await response.json();
    setTripDetails(tripRes);
  };

  // Make Reservation
  const makeReservation = async (
    id,
    boarding_point,
    alighting_point,
    passenger_list
  ) => {
    const response = await fetch(`${host}/api/user/book/${id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boarding_point, alighting_point, passenger_list }),
    });
    const res = await response.json();
    setReserve(res);
    console.log(reserve);
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
    return response.json();
  };

  return (
    <ReservationContext.Provider
      value={{
        rev,
        setRev,
        reserve,
        makeReservation,
        getReserve,
        searchTrip,
        tripDetails,
        pass,
        setPass,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;
