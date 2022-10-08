import React from "react";

export default function BusItems() {
  return (
    <div className="card w-90" style={{margin: "4px auto"}}>
      <div className="card-body">
        <div className="lh-24 f-bold p-1">Service Type</div>
        <div className="d-flex justify-content-start">
          <div className="p-1 w-10 row-one">
            <div className="lh-24 f-bold">Source</div>
            <div className="f-12 mt-1 text-secondary">Time</div>
            <div className="lh-24 f-bold mt-2">Destination</div>
            <div className="f-12 mt-1 text-secondary">Time</div>
          </div>
          <div className="p-1 w-10 row-two">
            <div className="lh-24 f-bold">boarding_point</div>
            <div className="f-12 mt-1 text-secondary">Time</div>
            <div className="lh-24 f-bold mt-2">alighting_point</div>
            <div className="f-12 mt-1 text-secondary">Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
