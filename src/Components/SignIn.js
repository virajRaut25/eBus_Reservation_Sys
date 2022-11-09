import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      if (json.error) {
        alert(json.error);
      } else {
        alert(json.errors[0].msg);
      }
    }
  };
  return (
    <div className="container my-3">
      <h2>Sign In to continue on eBus</h2>
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
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
