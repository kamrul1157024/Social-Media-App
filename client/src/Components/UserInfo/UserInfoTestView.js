import React, { useState } from "react";
import UserInfo from "./UserInfo";

const UserInfoTestView = () => {
  const [state, setstate] = useState({
    user: {
      userId: 8,
      userName: "iliyas",
      firstName: "iliyas",
      lastName: "kanchon",
      email: null,
      dateOfBirth: "1956-03-18",
      profilePicture:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Ilias_Kanchan_%28cropped%29.jpg",
      city: "Dhaka",
      country: "Bangladesh",
      gender: "",
      totalNumberOfFollower: 1,
      totalNumberOfUserFollowed: 1,
      userDescription: null,
      emailVisible: false,
      emailVerified: false,
      followedByCurrentlyLoggedInUser: null,
    },
    postTime: "2021-03-17T17:11:32.951+00:00",
    fontSize: 15,
  });

  return (
    <div style={{ marginTop: "100px" }}>
      <UserInfo {...state} />
    </div>
  );
};

UserInfoTestView.propTypes = {};

export default UserInfoTestView;
