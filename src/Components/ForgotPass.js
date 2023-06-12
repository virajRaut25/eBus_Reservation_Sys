import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPass(props) {
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const { showAlert } = props;
  const [credential, setCredential] = useState({
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, mobile, password, cpassword } = credential;
    if (password === cpassword) {
      const response = await fetch(`${host}/api/auth/resetPass`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          mobile,
          password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        showAlert("success", "Password Reset Successfully.");
        navigate("/signIn");
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
      <h2 className="pt-5">Reset Password</h2>
      <p className="fs-5">
        Match your Email id with your registered Mobile Number and Set New
        Password.
      </p>
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
          Reset Password
        </button>
      </form>
    </div>
  );
}
