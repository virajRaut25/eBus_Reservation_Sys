import React from "react";

export default function PassengerDetails(props) {
  return (
    <>
      <div className="h4-primary mt-2 mb-2">Passenger {props.index + 1}</div>
      <div className="row g-4">
        <div className="input-group col-md">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup1"
              placeholder="pasname"
              name="passname"
            />
            <label htmlFor="floatingInputGroup1">Name</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <select className="form-select" name="gender" id="floatingSelectGrid">
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
                disabled
                className="form-control"
                id="floatingPlaintextInput"
                value={props.seatNo}
              />
              <label htmlhtmlFor="floatingPlaintextInput">Seat Number</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
