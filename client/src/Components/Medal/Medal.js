import axios from "axios";
import React, { useState } from "react";
import { FaMedal } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../Cookie/Cookie";
import { getMedalGiverURL } from "../../RestUrls/RestURL";
import "./Medal.css";

const updateMedalSize = (medalTypeToBeUpdated) => {
  const defaultMedalSize = "20px";
  const selectedMedalSize = "25px";

  const initialMedalSize = {
    bronze: defaultMedalSize,
    silver: defaultMedalSize,
    gold: defaultMedalSize,
  };

  if (medalTypeToBeUpdated === "BRONZE") {
    return {
      ...initialMedalSize,
      bronze: selectedMedalSize,
    };
  } else if (medalTypeToBeUpdated === "SILVER") {
    return {
      ...initialMedalSize,
      silver: selectedMedalSize,
    };
  } else if (medalTypeToBeUpdated === "GOLD") {
    return {
      ...initialMedalSize,
      gold: selectedMedalSize,
    };
  } else {
    return initialMedalSize;
  }
};

const increase = (x) => x + 1;
const decrease = (x) => x - 1;

const updateMedalCount = (
  previousMedalCount,
  medalTypeToUpdate,
  operationType
) => {
  if (medalTypeToUpdate === "BRONZE") {
    return {
      ...previousMedalCount,
      totalBronze: operationType(previousMedalCount.totalBronze),
    };
  } else if (medalTypeToUpdate === "SILVER") {
    return {
      ...previousMedalCount,
      totalSilver: operationType(previousMedalCount.totalSilver),
    };
  } else if (medalTypeToUpdate == "GOLD") {
    return {
      ...previousMedalCount,
      totalGold: operationType(previousMedalCount.totalGold),
    };
  }
};

const getMedals = (total) => {
  const medals = parseFloat(total);
  if (medals >= 1000) {
    return (medals / 1000).toFixed(1) + "k";
  }
  return medals;
};

const Medal = ({ post }) => {
  const currentPostId = post.postId;
  const jwt = getCookie("jwt");

  const [state, setstate] = useState({
    medalCount: {
      totalBronze: post.totalBronze,
      totalSilver: post.totalSilver,
      totalGold: post.totalGold,
    },
    medalTypeProvidedByLoggedInUser: post.medalTypeProvidedByLoggedInUser,
    medalSize: updateMedalSize(post.medalTypeProvidedByLoggedInUser),
  });

  const sendToServer = async (medalType) => {
    const header = { headers: { Authorization: jwt } };
    try {
      await axios.put(
        `${getMedalGiverURL()}/post/${currentPostId}/medal/${medalType}`,
        {},
        header
      );
    } catch {
      toast.error("Clam Down!", { autoClose: 3000 });
    }
  };

  const onClickHandler = (currentlyClickedMedal) => {
    if (!jwt) {
      toast.error("LogIn or Register Before Upvote", { autoClose: 3000 });
    } else {
      const previouslySelectedMedalType = state.medalTypeProvidedByLoggedInUser;
      const previousMedalCount = state.medalCount;

      let updatedMedalCount,
        updatedMedalSize,
        updatedMedalTypeProvidedByLoggedInUser;

      if (currentlyClickedMedal === previouslySelectedMedalType) {
        updatedMedalCount = updateMedalCount(
          previousMedalCount,
          currentlyClickedMedal,
          decrease
        );
        updatedMedalSize = updateMedalSize("NO_MEDAL");
        updatedMedalTypeProvidedByLoggedInUser = "NO_MEDAL";
        sendToServer(updatedMedalTypeProvidedByLoggedInUser);
      } else if (
        currentlyClickedMedal !== previouslySelectedMedalType &&
        (previouslySelectedMedalType === "NO_MEDAL" ||
          previouslySelectedMedalType === null)
      ) {
        updatedMedalCount = updateMedalCount(
          previousMedalCount,
          currentlyClickedMedal,
          increase
        );
        updatedMedalSize = updateMedalSize(currentlyClickedMedal);
        updatedMedalTypeProvidedByLoggedInUser = currentlyClickedMedal;
        sendToServer(updatedMedalTypeProvidedByLoggedInUser);
      } else {
        updatedMedalCount = updateMedalCount(
          previousMedalCount,
          previouslySelectedMedalType,
          decrease
        );
        updatedMedalCount = updateMedalCount(
          updatedMedalCount,
          currentlyClickedMedal,
          increase
        );
        updatedMedalSize = updateMedalSize(currentlyClickedMedal);
        updatedMedalTypeProvidedByLoggedInUser = currentlyClickedMedal;
        sendToServer(updatedMedalTypeProvidedByLoggedInUser);
      }

      setstate({
        ...state,
        medalCount: updatedMedalCount,
        medalSize: updatedMedalSize,
        medalTypeProvidedByLoggedInUser: updatedMedalTypeProvidedByLoggedInUser,
      });
    }
  };
  return (
    <div className="medal-container">
      <div
        className="bronze-medal-icon"
        onClick={() => {
          onClickHandler("BRONZE");
        }}
      >
        <FaMedal color="#cd7f32" style={{ fontSize: state.medalSize.bronze }} />
      </div>
      <div className="bronze-medal-text">
        <span>{getMedals(state.medalCount.totalBronze)}</span>
      </div>

      <div
        className="silver-medal-icon"
        onClick={() => {
          onClickHandler("SILVER");
        }}
      >
        <FaMedal color="silver" style={{ fontSize: state.medalSize.silver }} />
      </div>
      <div className="silver-medal-text">
        <span>{getMedals(state.medalCount.totalSilver)}</span>
      </div>

      <div
        className="gold-medal-icon"
        onClick={() => {
          onClickHandler("GOLD");
        }}
      >
        <FaMedal color="gold" style={{ fontSize: state.medalSize.gold }} />
      </div>
      <div className="gold-medal-text">
        <span>{getMedals(state.medalCount.totalGold)}</span>
      </div>
    </div>
  );
};

Medal.propTypes = {};

export default Medal;
