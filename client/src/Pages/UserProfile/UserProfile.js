import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import { useContext } from "react/cjs/react.development";
import Booklets from "../../Components/Booklets/Booklets";
import Follow from "../../Components/Follow/Follow";
import "../../Components/Post/Posts";
import Posts from "../../Components/Post/Posts";
import { getCookie } from "../../Cookie/Cookie";
import FollowedUserContext from "../../GlobalContext/FollowedUserContext";
import {
  getBookletsByUserID,
  getUserInfoURL,
  getUserPostURL,
} from "../../RestUrls/RestURL";
import "./UserProfile.css";

const getUserProfilePicture = (url) => {
  if (url)
    return (
      <img
        src={url}
        className="cropped "
        width="170px"
        style={{ borderRadius: "50%" }}
      />
    );
  return <IoPersonCircle style={{ fontSize: "150px" }} />;
};

const modify = (name) =>
  name ? name.charAt(0).toUpperCase() + name.substr(1) : "";

const getAge = (user) => {
  let timeInYear =
    Math.abs(new Date() - new Date(user.dateOfBirth)) /
    (1000 * 60 * 60 * 24 * 365);
  timeInYear = Math.round(timeInYear);
  return `${timeInYear} Years Old`;
};

const getFullNameAndUserName = (user) => {
  return `${modify(user.firstName)} ${modify(user.lastName)} (${
    user.userName
  })`;
};

const getDescription = (user) => {
  if (user.userDescription) {
    return user.userDescription;
  }

  return `${modify(user.firstName)} ${modify(
    user.lastName
  )} likes to be mysterious about himself`;
};

const getFollow = (total) => {
  const follow = parseFloat(total);
  if (follow >= 1000) {
    return (follow / 1000).toFixed(1) + "k";
  }
  return follow;
};

const isFollowing = (map, id) => {
  if (!map) return false;
  if (map.has(id) && map.get(id)) return true;
  else return false;
};

const getButtonColor = (state) => {
  return state ? "crimson" : "black";
};

const UserProfile = (props) => {
  const userName = props.match.params.userName;
  const [user, setuser] = useState("");

  const { isFollowed, setisFollowed } = useContext(FollowedUserContext);

  const [posts, setposts] = useState("");

  const [booklets, setbooklets] = useState("");

  const [buttons, setbuttons] = useState({
    postButton: true,
    bookletButton: false,
    communityButton: false,
  });

  const getUserPost = (userId, pageNo) => {
    setbuttons({
      postButton: true,
      bookletButton: false,
      communityButton: false,
    });

    const jwt = getCookie("jwt");
    const header = { Authorization: jwt };
    axios
      .get(getUserPostURL(userId, pageNo), { headers: header })
      .then((res) => {
        setposts(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    axios
      .get(getUserInfoURL(userName))
      .then((res) => {
        console.log(res.data);
        getUserPost(res.data.userId, 1);
        setuser(res.data);
      })
      .catch((err) => {
        toast.error(`${userName} does not exist`);
      });
  }, []);

  const onPostButtonClick = (e) => {
    e.preventDefault();
    console.log("post button click");
    getUserPost(user.userId, 1);
  };

  const onBookletButtonClick = (e) => {
    e.preventDefault();

    setbuttons({
      postButton: false,
      bookletButton: true,
      communityButton: false,
    });

    axios
      .get(getBookletsByUserID(user.userId))
      .then((res) => setbooklets(res.data))
      .catch((err) => toast.error(err.response.data.message));
  };

  const onCommunityButtonClick = (e) => {
    e.preventDefault();
  };

  const onFollowButtonClick = (e) => {
    e.preventDefault();
    let val = isFollowing(isFollowed, user.userId) ? -1 : 1;
    setuser({
      ...user,
      totalNumberOfFollower: user.totalNumberOfFollower + val,
    });
  };

  return (
    <div style={{ paddingTop: "60px" }} className="w3-center">
      <div>
        <div className="row user-info">
          <div className=" col-sm profile-picture">
            {getUserProfilePicture(user.profilePicture)} <br />
            <span onClick={onFollowButtonClick} style={{ margin: "10px" }}>
              <Follow user={user} size="20" borderRadius="10px" />
            </span>
          </div>

          <div className="col-sm-7">
            <p className="user-name">{getFullNameAndUserName(user)}</p>

            <p className="other-details">{`From ${user.city}, ${user.country}`}</p>
            <p className="other-details">
              {" "}
              {getAge(user)} | {modify(user.gender)}{" "}
            </p>
            {user.email && <p className="other-details"> {user.email} </p>}
          </div>

          <div className="col-sm">
            <div className="follow">
              <button className="btn-profile">
                Follower: {getFollow(user.totalNumberOfFollower)}{" "}
              </button>
              <button className="btn-profile">
                Followed: {getFollow(user.totalNumberOfUserFollowed)}
              </button>
            </div>
          </div>
        </div>
        <div className="description row">{getDescription(user)}</div>

        <div className="user-bar row">
          <div className="btn-group">
            <button
              className="btn-profile btn-profile-user-bar"
              onClick={onPostButtonClick}
              style={{ backgroundColor: getButtonColor(buttons.postButton) }}
            >
              Post
            </button>
            <button
              className="btn-profile btn-profile-user-bar"
              onClick={onBookletButtonClick}
              style={{ backgroundColor: getButtonColor(buttons.bookletButton) }}
            >
              Booklet
            </button>
            <button
              className="btn-profile btn-profile-user-bar"
              onClick={onCommunityButtonClick}
            >
              Community
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          <div className="col-sm-7">
            {posts.length && buttons.postButton ? (
              <Posts posts={posts} />
            ) : null}
            {booklets.length && buttons.bookletButton ? (
              <Booklets booklets={booklets} />
            ) : null}
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
