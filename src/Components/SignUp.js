import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const { showAlert } = props;
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const [credential, setCredential] = useState({
    fname: "",
    lname: "",
    dob: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    cpassword: "",
  });
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, dob, mobile, email, address, password, cpassword } =
      credential;
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          dob,
          mobile,
          email,
          address,
          password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        showAlert("success", "Account Successfully Created");
        localStorage.setItem("token", json.authtoken);
        navigate("/");
      } else {
        if (json.error) {
          showAlert("danger", json.error);
        } else {
          showAlert("danger", json.error[0].msg);
        }
      }
    } else {
      showAlert("danger", "Passwords don't Match");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="pt-5">Create an account to Book Ticket</h2>
      <form onSubmit={handleSubmit}>
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
              required
            />
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-md-5">
            <label htmlFor="mobile" className="form-label">
              Mobile No.
            </label>
            <input
              type="phone"
              className="form-control"
              id="mobile"
              name="mobile"
              value={credential.mobile}
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
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
}
