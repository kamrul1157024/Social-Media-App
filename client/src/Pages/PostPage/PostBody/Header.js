import React from "react";
import Tag from "../../../Components/Tags/Tag";
import UserInfo from "../../../Components/UserInfo/UserInfo";
const Header = ({ post }) => {
  const dim = "40px";
  const postTime = post.creationDate;
  const user = post.user;
  const title = post.postTitle;
  const userButtonState = post.postUpVotedByCurrentUser;
  const userTotalUpvotes = post.totalUpVotes;
  const tags = post.tags;
  return (
    <div style={{ paddingTop: "10px" }}>
      <div className="row">
        <div className="col">
          <div className="text-left" style={{ paddingLeft: "70px" }}>
            {" "}
            <span>Posted by,</span>{" "}
          </div>
          <div>
            <div className="media">
              <div className="d-inline-block">
                <div
                  className="media-body align-middle"
                  style={{ paddingLeft: "20px" }}
                >
                  <UserInfo user={user} postTime={postTime} fontSize="16px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <p>
            <b> Tags</b>{" "}
          </p>
          {tags.map((tag) => (
            <Tag key={tag.tagId} color="light" tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
