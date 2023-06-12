import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import reservationContext from "../context/reservation/reservationContext";

export default function ManageBooking(props) {
  const { showAlert } = props;
  let navigate = useNavigate();
  const context = useContext(reservationContext);
  const { bookings, getReserve, setReceipt, cancelBooking } = context;
  const [cancelTxt, setCancelTxt] = useState("");
  let dtToday = new Date();
  dtToday = Date.parse(dtToday.toISOString());
  useEffect(() => {
    getReserve();
  });

  const viewReceipt = async (booking) => {
    await setReceipt(booking);
    navigate("/receipt");
  };

  const onChange = (e) => {
    setCancelTxt(e.target.value);
  };

  const cancelReservation = async (id) => {
    await cancelBooking(id);
    document.getElementById("confirmCancel").value = "";
    showAlert("success", `Your Booking with ${id} ID is Cancelled.`);
  };

  return (
    <div>
      <div
        className="text-center fs-2"
        style={{ marginTop: "5rem", marginBottom: "2rem" }}
      >
        Manage Booking
      </div>
      <div className="row">
        {bookings.map((booking, index) => {
          return (
            <div className="col-sm-6 my-2" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="fs-5">Reservation Id</div>
                  <div>{booking._id}</div>
                  <div className="from">From: {booking.boarding_point}</div>
                  <div className="to">To: {booking.alighting_point}</div>
                  <div className="date">
                    Date: {booking.trip_id.trip_date.substring(0, 10)}
                  </div>
                  <div className="my-2 row justify-content-evenly">
                    <button
                      type="button"
                      className="btn btn-danger col-4"
                      onClick={() => viewReceipt(booking)}
                    >
                      View Receipt
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger col-4"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      disabled={dtToday>Date.parse(booking.trip_id.trip_date.toString())}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Cancel Booking
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="fs-5">Reservation Id</div>
                      <div>{booking._id}</div>
                      <div className="from">From: {booking.boarding_point}</div>
                      <div className="to">To: {booking.alighting_point}</div>
                      <div className="date">
                        Date: {booking.trip_id.trip_date.substring(0, 10)}
                      </div>
                      <p className="fs-5">
                        To confirm cancelation, type <i>cancel</i> in the text
                        input field.
                      </p>
                      <input
                        type="text"
                        name="confirmCancel"
                        id="confirmCancel"
                        onChange={onChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        id="cancelBtn"
                        onClick={() => cancelReservation(booking._id)}
                        data-bs-dismiss="modal"
                        className="btn btn-danger"
                        disabled={cancelTxt !== "cancel"}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
