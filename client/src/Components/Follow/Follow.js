import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { getCookie } from "../../Cookie/Cookie";
import FollowedUserContext from "../../GlobalContext/FollowedUserContext";
import UserContext from "../../GlobalContext/UserContext";
import { getAddToFollowURL } from "../../RestUrls/RestURL";
import "./Follow.css";
import { addFollowed, removeFollowed } from "./UserFollows";

const Follow = ({ user, size, width, borderRadius }) => {
  const userId = user.userId;
  const { isFollowed, setisFollowed } = useContext(FollowedUserContext);
  const currentlyLoggedInUser = useContext(UserContext);

  const fontSize = size ? `${size}px` : "11px";
  const buttonWidth = width ? `${width}px` : "75px";
  const buttonBorderRadius = borderRadius ? borderRadius : "0px";
  // validateFollowerList(currentlyLoggedInUser.userId);
  const getStyle = (followState) => {
    return followState ? "followed-button" : "follow-button";
  };

  const getText = (followState) => (followState ? "followed" : "follow");

  const onFollowButtonClick = async (e) => {
    e.preventDefault();
    const jwt = getCookie("jwt");

    if (!jwt) {
      toast.error("Not Logged In");
      return;
    }

    let modifiedMap = new Map(isFollowed);

    if (isFollowing(isFollowed, userId)) {
      modifiedMap.set(userId, false);
      removeFollowed(userId);
    } else {
      modifiedMap.set(userId, true);
      addFollowed(userId);
    }

    console.log("modified Map :", modifiedMap);
    setisFollowed(modifiedMap);

    const header = { Authorization: jwt };
    const data = { follow: userId };
    try {
      const res = await axios.put(getAddToFollowURL(), data, {
        headers: header,
      });
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const isFollowing = (map, id) => {
    if (!map) return false;
    if (map.has(id) && map.get(id)) return true;
    else return false;
  };

  /*Not showing follow button for own post  and booklets etc
and when user not logged in;
*/

  console.log(isFollowed);

  const followButtonRender = () => {
    if (currentlyLoggedInUser && currentlyLoggedInUser.userId != user.userId)
      return (
        <button
          className={getStyle(isFollowing(isFollowed, userId))}
          onClick={onFollowButtonClick}
          style={{ fontSize: fontSize, borderRadius: buttonBorderRadius }}
        >
          {getText(isFollowing(isFollowed, userId))}
        </button>
      );
    else return null;
  };

  return followButtonRender();
};

export default Follow;
