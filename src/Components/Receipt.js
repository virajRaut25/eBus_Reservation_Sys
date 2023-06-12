import React from "react";
import { useContext, useRef } from "react";
import reservationContext from "../context/reservation/reservationContext";
import { useReactToPrint } from "react-to-print";
export default function Receipt() {
  const printRef = useRef();
  const context = useContext(reservationContext);
  const { receipt } = context;

  const handlePrint = useReactToPrint({
    content: () =>
      printRef.current
  });

  return (
    <>
      <div className="receipt-container my-3" ref={printRef}>
        <div className="receipt-head mb-3">
          <div className="bus-logo"></div>
          <div className="receipt-title">
            <h2 className="receipt-mainHead">
              eBus: An Online Reservation System
            </h2>
            <h3 className="receipt-subHead">E-Reservation Ticket</h3>
          </div>
        </div>
        <p className="info-para">Trip Information</p>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>Trip Number:</td>
              <td>{receipt.trip_id._id}</td>
              <td>Reservation Number:</td>
              <td>{receipt._id}</td>
            </tr>
            <tr>
              <td>Approx Boarding Time:</td>
              <td>{receipt.b_time}</td>
              <td>Approx Alighting Time:</td>
              <td>{receipt.a_time}</td>
            </tr>
            <tr>
              <td>Service Start Place:</td>
              <td>{receipt.trip_id.route_id.source}</td>
              <td>Service End Place:</td>
              <td>{receipt.trip_id.route_id.destination}</td>
            </tr>
            <tr>
              <td>Passenger Boarding Point:</td>
              <td>{receipt.boarding_point}</td>
              <td>Passenger Alighting Point:</td>
              <td>{receipt.alighting_point}</td>
            </tr>
            <tr>
              <td>Date of Journey:</td>
              <td>{receipt.trip_id.trip_date.substring(0, 10)}</td>
              <td>Departure time from Starting Place:</td>
              <td>{receipt.trip_id.sd_time}</td>
            </tr>
            <tr>
              <td>Bus Service Type:</td>
              <td>{receipt.trip_id.bus_id.service_type}</td>
              <td>No. of Seats:</td>
              <td>{receipt.passenger_list.length}</td>
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
            {receipt.passenger_list.map((passenger, index) => {
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
              <td>{(receipt.fare - 20) / 1.1 }</td>
            </tr>
            <tr>
              <td>Reservation Charges:</td>
              <td>20.00</td>
            </tr>
            <tr>
              <td>
                Total Chargable Amount: <br />
                Including GST (10%)
              </td>
              <td>{receipt.fare.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="greet-para">
          <p>Wish You Happy Journey</p>
          <p>For more detail visit us @ www.ebus.com</p>
          <p>Powered by NetServ IT Infrastructure & Servics Ltd.</p>
        </div>
      </div>
      <button
        className="btn btn-danger d-block mx-auto my-2"
        onClick={handlePrint}
      >
        Print/Download
      </button>
    </>
  );
}
