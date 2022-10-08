import React, { useState } from "react";

export default function SignUp() {
  const [credential, setCredential] = useState({
    fname: "",
    lname: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    cpassword: "",
  });
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Create an account to Book Ticket</h2>
      <form>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fname"
              name="fname"
              value={credential.fname}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              name="lname"
              value={credential.lname}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={credential.dob}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-5">
            <label htmlFor="phone" className="form-label">
              Mobile No.
            </label>
            <input
              type="phone"
              className="form-control"
              id="phone"
              name="phone"
              value={credential.phone}
              onChange={onChange}
              minLength={10}
              maxLength={10}
              required
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credential.email}
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            name="address"
            value={credential.address}
            aria-label="address"
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credential.password}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={credential.cpassword}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
