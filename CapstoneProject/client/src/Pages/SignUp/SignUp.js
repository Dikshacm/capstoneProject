import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  // rect hooks useState hook
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  const history = useHistory();

  const singUpUser = async (e) => {
    e.preventDefault();

    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };
    await fetch("http://localhost:8080/users/", requestOptions)
      .then((response) => {
        console.log(response);

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          history.push("/login");
        }
        console.log(data);
      });
  };

  return (
    <form className="signup-form" onSubmit={singUpUser}>
      <header className="logo">Market Place</header>
      <header className="form-title"> Register </header>
      <div className="rgister form-control">
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setuser({ ...user, name: e.target.value })}
        />
      </div>

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

      <input type="submit" value="Sign Up"></input>
      <span className="form-change">
        Alreay have an account? <Link to="/login">Singin</Link>{" "}
      </span>
    </form>
  );
};

export default SignUp;
