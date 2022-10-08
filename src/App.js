import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Help from "./Components/Help";
import ManageBooking from "./Components/ManageBooking";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import SearchState from "./context/search/SearchState";

function App() {
  return (
    <>
      <SearchState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route
                exact
                path="/manageBooking"
                element={<ManageBooking />}
              ></Route>
              <Route exact path="/help" element={<Help />}></Route>
              <Route exact path="/signIn" element={<SignIn />}></Route>
              <Route exact path="/signUp" element={<SignUp />}></Route>
            </Routes>
          </div>
        </Router>
      </SearchState>
    </>
  );
}

export default App;
