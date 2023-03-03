import axios from "axios";
import { getCookie } from "../../Cookie/Cookie";
import {
  getAddToFollowURL,
  getAllFollowedLoggedInUserURL,
} from "../../RestUrls/RestURL";

const followKey = "followerList";
const LastFetchedTimeOfFollowerList = "LastFetchedTimeOfFollowerList";

/* Need to call this in FollowJS validate after some interval*/

const binarySearch = (list, item) => {
  let l = 0,
    r = list.length;

  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (list[mid] == item) return true;

    if (list[mid] < item) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return false;
};

const makeListUnique = (list) => {
  list.sort((a, b) => a - b);
  let uniqueList = [];

  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] != list[i + 1]) uniqueList.push(list[i]);
  }

  uniqueList.push(list[list.length - 1]);

  return uniqueList;
};

const getAnomalies = (localList, serverList) => {
  let anamolyList = [];

  if (localList.length === serverList) return anamolyList;

  localList.forEach((item) => {
    if (!binarySearch(serverList, item)) anamolyList.push(item);
  });

  serverList.forEach((item) => {
    if (!binarySearch(localList, item)) anamolyList.push(item);
  });

  return makeListUnique(anamolyList);
};

const fetchListFromServer = () => {
  const jwt = getCookie("jwt");
  if (!jwt) throw "NOT LOGGED IN";
  const header = { Authorization: jwt };
  return;
  axios.get(getAllFollowedLoggedInUserURL(), { headers: header });
};

const resolveAnomalies = (list, userId) => {
  const jwt = getCookie("jwt");
  if (!jwt) throw "NOT LOGGED IN";

  const header = { Authorization: jwt };
  const data = { follow: userId };
  axios
    .put(getAddToFollowURL(), data, { headers: header })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

/*Will be used Later*/
export const validateFollowerList = (userId) => {
  const lastFetchedTime = new Date(
    localStorage.getItem(LastFetchedTimeOfFollowerList)
  );

  const currentTime = new Date();

  const timePassed = Math.round(
    (currentTime.getTime() - lastFetchedTime.getTime()) / 1000
  );

  if (lastFetchedTime >= 6) {
    let localList = getAllFollowed();
    try {
      fetchListFromServer()
        .then((res) => {
          let serverList = res.data;
          let anamolies = getAnomalies(localList, serverList);
          resolveAnomalies(anamolies, userId);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
};

export const isEmpty = () => {
  const followerList = localStorage.getItem(followKey);
  if (followerList) return false;
  return true;
};

export const getAllFollowed = () => {
  const followedList = JSON.parse(localStorage.getItem(followKey));

  return followedList;
};

export const saveFollowedList = (followedList) => {
  localStorage.setItem(followKey, JSON.stringify(followedList));
  // localStorage.setItem(
  //     LastFetchedTimeOfFollowerList,
  //     new Date()
  // );
};

export const removeAllFollowed = () => {
  return localStorage.removeItem(followKey);
};

export const addFollowed = (userId) => {
  let userIdList = getAllFollowed();
  userIdList.push(userId);
  saveFollowedList(userIdList);
  return userIdList;
};

export const removeFollowed = (userId) => {
  console.log("UserId", userId);
  let userIdList = getAllFollowed();
  console.log(userIdList);
  const positionToBeRemoved = userIdList.indexOf(userId);
  console.log("positionToBeRemoved", positionToBeRemoved);
  userIdList.splice(positionToBeRemoved - 1);
  saveFollowedList(userIdList);
  return userIdList;
};
