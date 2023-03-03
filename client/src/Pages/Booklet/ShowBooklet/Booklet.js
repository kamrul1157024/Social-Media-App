import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookletURL } from "../../../RestUrls/RestURL";
import Header from "../Header";
import "./Booklet.css";
import BookletContent from "./BookletContent";

const Booklet = (props) => {
  const bookletId = props.match.params.bookletId;
  const [booklet, setbooklet] = useState("");

  useEffect(() => {
    axios
      .get(getBookletURL(bookletId))
      .then((res) => {
        setbooklet(res.data);
        console.log(res.data);
      })
      .catch((err) => toast.error("Booklet Not Found"));
  }, []);

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col-sm-7">
        <div style={{ marginTop: "70px" }} className="booklet">
          <div style={{ marginTop: "20px" }}>
            <p className="booklet-word"> BOOKLET </p>
            {booklet && <Header booklet={booklet} />}
          </div>
          <div className="booklet-title w3-center">{booklet.bookletTitle}</div>
          <div className="booklet-description w3-center">
            {booklet.bookletDescription}
          </div>
          <div className="containers">
            {booklet.bookletContents &&
              booklet.bookletContents
                .sort((a, b) => a.serialNo - b.serialNo)
                .map((content) => (
                  <BookletContent
                    key={content.bookletContentId}
                    content={content}
                  />
                ))}
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Booklet;
