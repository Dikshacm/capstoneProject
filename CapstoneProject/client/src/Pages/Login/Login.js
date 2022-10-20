import { React, useState, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const Login = () => {
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  const history = useHistory();
  const [globalUser, setglobalUser] = useContext(UserContext);
  const loginUser = async (e) => {
    e.preventDefault();

    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    await fetch("http://localhost:8080/users/login", requestOptions)
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setglobalUser(data);
          // SETTING UP THE DATA IN THE LOCAL STORAGE
          //  WHEN WE CLOSE THE TAB AND REOPEN THE WEBSITE
          // WE WILL USE THIS DATA TO SHOW THAT THERE IS A LOGGED IN USER
          localStorage.setItem("user", JSON.stringify(data));
          history.push("/");
        }
      });
  };

  useEffect(() => {
    if (globalUser != null) {
      history.push("/");
    }
  }, []);

  return (
    <form className="signup-form" onSubmit={loginUser}>
      <header className="logo">Market Place</header>
      <header className="form-title"> login </header>

      <div className="rgister form-control">
        <input
          className="register-input"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="rgister form-control">
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
        />
      </div>

      <input type="submit" value="Login"></input>
      <span className="form-change">
        Alreay have an account? <Link to="/register">Register</Link>{" "}
      </span>
    </form>
  );
};

export default Login;
