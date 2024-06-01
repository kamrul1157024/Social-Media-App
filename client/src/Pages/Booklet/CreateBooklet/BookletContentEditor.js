import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";
import { postTextFromRaw } from "../../../Components/Post/PostTextFromRaw";
import { getPostById } from "../../../RestUrls/RestURL";
import "./CreateBooklet.css";

const linkRegex = new RegExp("(https|http)://localhost:3000/post/[0-9]*");

/*Matches Against Internal Link*/
const isExternalLink = (link) => {
  const isExternalLink = !linkRegex.exec(link);
  return isExternalLink;
};

const getAddContentStyle = (content) => {
  return !content.externalLink
    ? "add-new-content-black"
    : "add-new-content-crimson";
};

const getLongestOne = (nodeList) => {
  let largestText = "";
  let maxLength = 0;
  nodeList.forEach((node) => {
    if (maxLength < node.content.length) {
      maxLength = node.content.length;
      largestText = node.content;
    }
  });

  return largestText;
};

const parseDataFromExternalLink = (data) => {
  console.log(data);
  const domParser = new DOMParser();
  const document = domParser.parseFromString(data, "text/html");
  const metaData = {
    title: getLongestOne(
      document.querySelectorAll('meta[property="og:title"]')
    ),
    details: getLongestOne(
      document.querySelectorAll('meta[property="og:description"]')
    ),
  };
  return metaData;
};

const parseDataFromInternalLink = (post) => {
  const data = {
    title: post.postTitle,
    details: postTextFromRaw(post).substr(0, 200),
  };
  return data;
};

const BookletContentEditor = ({
  bookletContents,
  setbookletContents,
  serial,
  setserial,
}) => {
  const initialState = {
    title: "",
    details: "",
    link: "",
    externalLink: false,
    serialNo: serial,
  };

  const [content, setcontent] = useState(initialState);

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const inputedValue = e.target.value;
    setcontent((prevContent) => {
      let newContent = { ...prevContent, [name]: inputedValue };
      if (name === "link") {
        newContent = {
          ...newContent,
          ["externalLink"]: isExternalLink(inputedValue),
        };
      }
      console.log("newContent", newContent);
      return newContent;
    });
  };

  const processExternalLink = (link) => {
    axios
      .get(content.link)
      .then((res) => {
        const data = parseDataFromExternalLink(res.data);
        setcontent({ ...content, ...data });
      })
      .catch((e) => console.log(e));
  };

  const processInternalLink = (link) => {
    console.log(link);
    const postIdRegex = new RegExp("/[0-9]+");
    let matched = parseInt(postIdRegex.exec(link)[0].substring(1));

    axios
      .get(getPostById(matched))
      .then((res) => {
        const data = parseDataFromInternalLink(res.data);
        setcontent({ ...content, ...data });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!content.link) return;
      content.externalLink
        ? processExternalLink(content.link)
        : processInternalLink(content.link);
    }, 20);
  }, [content.link]);

  const onAddToBookletButtonClick = (e) => {
    e.preventDefault();
    const newContent = { ...content, serialNo: serial };
    setserial(serial + 1);
    setbookletContents([...bookletContents, newContent]);
  };

  const onClearButtonClick = (e) => {
    e.preventDefault();
    setcontent(initialState);
  };

  return (
    <div className={getAddContentStyle(content)}>
      <input
        type="text"
        name="link"
        className="content-link"
        value={content.link}
        placeholder="Link"
        onChange={onChange}
      />

      <input
        type="text"
        name="title"
        className="content-title"
        value={content.title}
        placeholder="Title"
        onChange={onChange}
      />
      <br />
      <textarea
        type="text"
        name="details"
        className="content-details"
        value={content.details}
        placeholder="Details"
        onChange={onChange}
      />
      <br />
      <div className="btn-group content-editor-bottom-buttons">
        <button
          className="booklet-add-button"
          onClick={onAddToBookletButtonClick}
        >
          {" "}
          <RiAddLine style={{ fontSize: "25px" }} /> Add To the Booklet
        </button>
        <button className="clear-button" onClick={onClearButtonClick}>
          <AiOutlineClear style={{ fontSize: "20px" }} /> Clear{" "}
        </button>
      </div>
    </div>
  );
};

export default BookletContentEditor;
