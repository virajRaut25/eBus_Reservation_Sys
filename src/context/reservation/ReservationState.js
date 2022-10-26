import { useState } from "react";
import ReservationContext from "./reservationContext";

const ReservationState = (props) => {
  const host = "http://localhost:5000";
  const [tripDetails, setTripDetails] = useState([]);
  // Search Bus
  const searchTrip = async (id) => {
    const response = await fetch(`${host}/api/user/tripDetails`, {
      method: "POST",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJlZmI1MTRjNTIwOThhZTNiZWFhNThjIn0sImlhdCI6MTY1OTg3NjYyOH0.U6ZfFRracfUg3nljgZo5pQewpE5q6EqUZUWoieKMuas",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( {id: id} ),
    });
    const tripRes = await response.json();
    setTripDetails(tripRes);
  };
  const [rev, setRev] = useState({});
  return (
    <ReservationContext.Provider
      value={{ rev, setRev, searchTrip, tripDetails }}
    >
      {props.children}
    </ReservationContext.Provider>
  );
};

export default ReservationState;
