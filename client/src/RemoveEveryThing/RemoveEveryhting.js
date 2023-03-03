import { removeAllFollowed } from "../Components/Follow/UserFollows";
import { eraseCookie } from "../Cookie/Cookie";

const eraseAll = () => {
  eraseCookie("jwt");
  removeAllFollowed();
};

export default eraseAll;
