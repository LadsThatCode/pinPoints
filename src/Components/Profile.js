import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Profile.css"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile">
        <div id="usertextcontainer">
          <h2 id="profileH2">{user.name}</h2>
          <p id="profileP">{user.email}</p>
        </div>
        <div id="imagecontainer">
          <img id="userpicture" src={user.picture} />
        </div>
      </div>
    )
  );
};

export default Profile;