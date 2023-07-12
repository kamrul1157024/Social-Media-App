import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import {
  getAllFollowed,
  isEmpty,
  saveFollowedList,
} from "./Components/Follow/UserFollows";
import MedalTestView from "./Components/Medal/MedalTestView";
import NavigationBar from "./Components/navigationbar/NavigationBar";
import UserInfoTestView from "./Components/UserInfo/UserInfoTestView";
import { getCookie } from "./Cookie/Cookie";
import FollowedUserContext from "./GlobalContext/FollowedUserContext";
import UserContext from "./GlobalContext/UserContext";
import CreateBooklet from "./Pages/Booklet/CreateBooklet/CreateBooklet";
import Booklet from "./Pages/Booklet/ShowBooklet/Booklet";
import HomePage from "./Pages/HomePage/HomePage";
import PostPage from "./Pages/PostPage/PostPage";
import PostWritting from "./Pages/PostWritting/PostWritting";
import UserProfile from "./Pages/UserProfile/UserProfile";
import {
  getAllFollowedLoggedInUserURL,
  getCurrentlyLoggeInUserUrl,
} from "./RestUrls/RestURL";

function App() {
  const [user, setuser] = useState();

  const [isFollowed, setisFollowed] = useState();

  const convertFollowedListToMap = (list) => {
    let followedMap = new Map();
    if (!list) return followedMap;
    list.forEach((id) => followedMap.set(id, true));
    return followedMap;
  };

  useEffect(() => {
    console.log("User Render");
    const jwt = getCookie("jwt");
    if (!jwt) return;
    const header = { Authorization: jwt };
    axios
      .get(getCurrentlyLoggeInUserUrl(), { headers: header })
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => console.log(err));

    if (isEmpty()) {
      console.log("Empty!");
      axios
        .get(getAllFollowedLoggedInUserURL(), { headers: header })
        .then((res) => {
          saveFollowedList(res.data);
          setisFollowed(convertFollowedListToMap(res.data));
        })
        .catch((err) => console.log(err));
    } else {
      setisFollowed(convertFollowedListToMap(getAllFollowed()));
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <FollowedUserContext.Provider value={{ isFollowed, setisFollowed }}>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <Route exact path="/writePost" component={PostWritting} />
            <Route exact path="/createBooklet" component={CreateBooklet} />
            <Route exact path="/user-info-test" component={UserInfoTestView} />
            <Route exact path="/medal-test" component={MedalTestView} />
          </Switch>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/index" component={HomePage} />
          </Switch>
          <Switch>
            <Route exact path="/post/:postId" component={PostPage} />
            <Route exact path="/booklet/:bookletId" component={Booklet} />
            <Route exact path="/user/:userName" component={UserProfile} />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </FollowedUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
