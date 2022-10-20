import { React, useContext } from "react";
import "./NavigationStyle.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import { CgProfile, CgSearch, CgLogOff } from "react-icons/cg";
import { UserContext } from "../../Context/userContext";

const Navigation = () => {
  const [globalUser, setglobalUser] = useContext(UserContext);

  const logOutUser = () => {
    console.log("log out");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="navigation">
      <div className="nav-container1">
        <div>English</div>

        <header className="nav-header">Market Place</header>

        <div className="nav-container1-side">
          {/* <button>Search</button>{" "} */}
          <span className="search-container">
            <CgSearch className="icon"></CgSearch> Search
          </span>

          {globalUser === null ? (
            <Link to="/login">
              {" "}
              <CgProfile className="icon"></CgProfile>
            </Link>
          ) : (
            <span>
              <Link to="/userprofile">{globalUser.name}</Link>
              <CgLogOff onClick={logOutUser}></CgLogOff>
            </span>
          )}
        </div>
      </div>

      <div className="nav-container2">
        <ul className="nav-container2-list">
          <li className="nav-container2-link"> Category </li>
          <li className="nav-container2-link"> Category </li>
          <li className="nav-container2-link"> Category </li>
          <li className="nav-container2-link"> Category </li>
          <li className="nav-container2-link"> Category </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
