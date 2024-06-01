import React from "react";
import { useHistory } from "react-router";
import Header from "../../Pages/Booklet/Header";
import "./Booklet.css";

const Booklet = ({ booklet }) => {
  const history = useHistory();

  const onBookletClick = (e) => {
    e.preventDefault();
    history.push(`/booklet/${booklet.bookletId}`);
  };

  return (
    <div className="booklet w3-center">
      <div style={{ marginTop: "10px" }}>
        <p className="booklet-word"> BOOKLET </p>
        {booklet && <Header booklet={booklet} />}
      </div>
      <div className="booklet-title">{booklet.bookletTitle}</div>
      <div className="booklet-description">{booklet.bookletDescription}</div>

      <div>
        <button className="visit-booklet-button" onClick={onBookletClick}>
          Visit Booklet
        </button>
      </div>
    </div>
  );
};

Booklet.propTypes = {};

export default Booklet;
