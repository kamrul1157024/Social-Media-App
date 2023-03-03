import React from "react";
import { Helmet } from "react-helmet";
const MetaData = ({ title, description, image }) => {
  console.log(title);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph By Facebook*/}
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="Will be added"/> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content={title} />
      {/* <meta property="twitter:url" content="Will be added"/> */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

MetaData.propTypes = {};

export default MetaData;
