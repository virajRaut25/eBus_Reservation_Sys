import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          eBus
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manageBooking">
                Manage Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/help">
                Help
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token")? <form className="d-flex">
            <Link className="btn btn-danger mx-1" to="/signIn" role="button">SignIn</Link>
            <Link className="btn btn-danger mx-1" to="/signUp" role="button">SignUp</Link>
          </form>: <button className="btn btn-danger mx-1" onClick={handleLogout}>LogOut</button>}
        </div>
      </div>
    </nav>
  );
}
