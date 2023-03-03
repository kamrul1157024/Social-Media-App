import React from "react";
import PostTime from "../../../Components/PostTIme/PostTime";
import Title from "../../../Components/Title/Title";
import Username from "../../../Components/UserName/Username";
const Header = ({ post }) => {
  const dim = "60px";
  const postTime = post.creationDate;
  const user = post.user;
  const title = post.postTitle;
  return (
    <div style={{ paddingTop: "10px" }}>
      <div className="media">
        <div className="media-body" style={{ paddingLeft: "20px" }}>
          <div className="row">
            <div className="col-sm-4">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>
                        <Username user={user} />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="w3-left-align">
                        <small>
                          <i>
                            <PostTime time={postTime} />
                          </i>
                        </small>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col w3-leftbar w3-border-black">
              <Title title={title} titleFont="16px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
