import "./App.css";
import { useState } from "react";
import Home from "./Pages/Home/Home";
import Navigation from "./Component/Navigation/Navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import { UserProvider } from "./Context/userContext";
import UserProfile from "./Pages/UserProfile/UserProfile";
import { UserContext } from "./Context/userContext";

function App() {
  const [isUserLoggedIN, setisUserLoggedIN] = useState(
    JSON.parse(localStorage.getItem("user") != "undefined" ? true : false)
  );

  return (
    <Router>
      <UserProvider>
        {/* <Navigation></Navigation> */}
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/register">
              {/* IF THE USER IS LOGGED IN, YOU CAN NOT GO TO THE SIGNIN OR REGISTER PAGE */}
              {isUserLoggedIN ? (
                <Redirect to="/"> </Redirect>
              ) : (
                <SignUp></SignUp>
              )}
            </Route>
            <Route exact path="/login">
              {/* IF THE USER IS LOGGED IN, YOU CAN NOT GO TO THE SIGNIN OR REGISTER PAGE */}
              {/* {isUserLoggedIN ? <Redirect to="/"> </Redirect> : <Login></Login>} */}
              <Login></Login>
            </Route>
            <Route exact path="/userprofile">
              <UserProfile></UserProfile>
            </Route>
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
