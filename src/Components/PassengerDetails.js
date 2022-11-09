import React from "react";

export default function PassengerDetails(props) {
  const {onChange, passDetails} = props;
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
              onChange={event => onChange(event, props.index)}
              value={passDetails.passname}
              name="passname"
            />
            <label htmlFor="floatingInputGroup1">Name</label>
          </div>
        </div>
        <div className="col-md">
          <div className="form-floating">
            <select className="form-select" name="gender" value={passDetails.gender} onChange={event => onChange(event, props.index)} id="floatingSelectGrid">
              <option value="Click on Arrow" defaultChecked>Click on Arrow</option>
              <option value="Male" >Male</option>
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
                value={passDetails.age}
                onChange={event => onChange(event, props.index)}
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
                onChange={event => onChange(event, props.index)}
                className="form-control"
                disabled
                id="floatingPlaintextInput"
                defaultValue={props.seatNo}
              />
              <label htmlFor="floatingPlaintextInput">Seat Number</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
