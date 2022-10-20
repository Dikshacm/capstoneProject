import { React, useContext, useState, useEffect } from "react";
import Navigation from "../../Component/Navigation/Navigation";
import "./UserProfileStyle.css";
import { UserContext } from "../../Context/userContext";
// import "../../../../server/uploads/c3uhsgo1vx541.jpg";

const UserProfile = () => {
  const [globalUser, setglobalUser] = useContext(UserContext);

  const [avatarPath, setavatarPath] = useState(null);

  useEffect(() => {
    console.log(globalUser);
  }, []);
  const uploadAvatar = async (e) => {
    e.preventDefault();
    console.log(avatarPath.name);

    const requestOptions = {
      crossDomain: true,
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avatarPath),
    };

    await fetch("http://localhost:8080/users/uploadAvatar", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleFileChnage = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setavatarPath(file);
  };

  return (
    <>
      <Navigation></Navigation>

      <div className="user-profile-container">
        <div className="user-profile-section">
          <div className="user-info">
            <div className="iamge-section">
              <form
                onSubmit={uploadAvatar}
                method="POST"
                encType="multipart/form-data"
              >
                <img
                  id="avtar-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuoovVYEMl5PlyrnrmjPY_0bH_k0RaXYByiMVOWeEhWeG9wxWP2ozVw0Ab51hiQzxErpo&usqp=CAU"
                ></img>

                <img
                  src={`data:${globalUser.avatar.ContentType};base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(globalUser.avatar.data.data)
                    )
                  )}`}
                ></img>

                <img src="../../../../server/c3uhsgo1vx541.jpg"></img>

                <input
                  type="file"
                  id="avtar-image-input"
                  value={avatarPath}
                  onChange={handleFileChnage}
                />
                {/* <input
                  type="text"
                  value={avatarPath}
                  onChange={(e) => setavatarPath(e.target.value)}
                /> */}

                <label for="avtar-image-input" id="avtar-upload-button">
                  {" "}
                  Upload Image
                </label>
                <input type="submit"></input>
              </form>
            </div>
            <div> {globalUser.name} das</div>
          </div>
        </div>

        <div className="dynamic-section">dynamic Center</div>
      </div>
    </>
  );
};

export default UserProfile;
