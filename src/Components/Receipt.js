import React from "react";
import { useEffect, useContext, useRef } from "react";
import reservationContext from "../context/reservation/reservationContext";
import { useReactToPrint } from "react-to-print";
export default function Receipt() {
  const printRef = useRef();
  const context = useContext(reservationContext);
  const { rev, searchTrip, pass, reserve } = context;
  useEffect(
    () => {
      console.log("useEffect run");
      window.addEventListener("popstate", onBackButtonEvent);
    },
    // eslint-disable-next-line
    [searchTrip]
  );

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    searchTrip(rev.trip_id);
  };

  const handlePrint = useReactToPrint({
    content: ()=> printRef.current
  })

  return (
    <>
    <div className="receipt-container my-3" ref={printRef}>
      <div className="receipt-head mb-3">
      <div className="bus-logo"></div>
      <div className="receipt-title">
        <h2 className="receipt-mainHead">eBus: An Online Reservation System</h2>
        <h3 className="receipt-subHead">E-Reservation Ticket</h3>
      </div>
      </div>
      <p className="info-para">Trip Information</p>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>Trip Number:</td>
            <td>{rev.trip_id}</td>
            <td>Reservation Number:</td>
            <td>{reserve.saveReservation._id}</td>
          </tr>
          <tr>
            <td>Approx Boarding Time:</td>
            <td>{rev.bTime}</td>
            <td>Approx Alighting Time:</td>
            <td>{rev.aTime}</td>
          </tr>
          <tr>
            <td>Service Start Place:</td>
            <td>{rev.source}</td>
            <td>Service End Place:</td>
            <td>{rev.destination}</td>
          </tr>
          <tr>
            <td>Passenger Boarding Point:</td>
            <td>{rev.boarding_point}</td>
            <td>Passenger Alighting Point:</td>
            <td>{rev.alighting_point}</td>
          </tr>
          <tr>
            <td>Date of Journey:</td>
            <td>{rev.trip_date.substring(0, 10)}</td>
            <td>Departure time from Starting Place:</td>
            <td>{rev.sd_time}</td>
          </tr>
          <tr>
            <td>Bus Service Type:</td>
            <td>{rev.service_type}</td>
            <td>No. of Seats:</td>
            <td>{pass.length}</td>
          </tr>
        </tbody>
      </table>
      <p className="info-para">Passenger Information</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Seat No</th>
          </tr>
        </thead>
        <tbody>
          {pass.map((passenger, index) => {
            return (
              <tr key={index}>
                <td>{passenger.name}</td>
                <td>{passenger.gender}</td>
                <td>{passenger.age}</td>
                <td>{passenger.seat_no}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="info-para">Total Fare Details</p>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>Basic Fare:</td>
            <td>{pass.length * rev.fare}</td>
          </tr>
          <tr>
            <td>Reservation Charges:</td>
            <td>20.00</td>
          </tr>
          <tr>
            <td>
              Total Chargable Amount: <br />
              Including GST
            </td>
            <td>{(pass.length * rev.fare * 1.1 + 20).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="greet-para">
        <p>Wish You Happy Journey</p>
        <p>For more detail visit us @ www.ebus.com</p>
        <p>Powered by NetServ IT Infrastructure & Servics Ltd.</p>
      </div>
    </div>
    <button className="btn btn-danger d-block mx-auto my-2" onClick={handlePrint} >Print/Download</button>
    </>
  );
}
