import React from "react";
import Booklet from "./Booklet";
const Booklets = ({ booklets }) => {
  return (
    <>
      {booklets &&
        booklets.map((booklet) => (
          <Booklet key={booklet.bookletId} booklet={booklet} />
        ))}
    </>
  );
};

export default Booklets;
