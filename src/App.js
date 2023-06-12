import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Help from "./Components/Help";
import ManageBooking from "./Components/ManageBooking";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import SearchState from "./context/search/SearchState";
import SearchResult from "./Components/SearchResult";
import ReservationForm from "./Components/ReservationForm";
import ReservationState from "./context/reservation/ReservationState";
import Receipt from "./Components/Receipt";
import Alert from "./Components/Alert";
import { useState } from "react";
import ForgotPass from "./Components/ForgotPass";
import Footer from "./Components/Footer";

function App() {
  const [alert, setalert] = useState();
  const showAlert = (type, message) => {
    setalert({
      type: type,
      msg: message,
    });
    setTimeout(() => {
      setalert(null);
    }, 2500);
  };
  return (
    <>
      <ReservationState>
        <SearchState>
          <Router>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route
                  exact
                  path="/manageBooking"
                  element={<ManageBooking showAlert={showAlert}/>}
                ></Route>
                <Route
                  exact
                  path="/searchResult"
                  element={<SearchResult />}
                ></Route>
                <Route
                  exact
                  path="/reservationForm"
                  element={<ReservationForm showAlert={showAlert}/>}
                ></Route>
                <Route exact path="/receipt" element={<Receipt showAlert={showAlert}/>}></Route>
                <Route exact path="/help" element={<Help />}></Route>
                <Route exact path="/signIn" element={<SignIn showAlert={showAlert}/>}></Route>
                <Route exact path="/signUp" element={<SignUp showAlert={showAlert}/>}></Route>
                <Route exact path="/forgotPass" element={<ForgotPass showAlert={showAlert}/>}></Route>
              </Routes>
            </div>
            <Footer />
          </Router>
        </SearchState>
      </ReservationState>
    </>
  );
}

export default App;
