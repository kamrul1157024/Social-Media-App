import Medal from "../Medal/Medal";
import Tag from "../Tags/Tag";
import Title from "../Title/Title";
import Header from "./Header";
import "./Post.css";
import PostShortText from "./PostText";
import PostUrl from "./PostUrl";

const Post = ({ post }) => {
  const postId = post.postId;
  const tags = post.tags;
  const userButtonState = post.postUpVotedByCurrentUser;
  const userTotalUpvotes = post.totalUpVotes;
  return (
    <div className="main w3-white  ">
      <div className="header">
        <Header post={post} />
      </div>
      <div className="w3-center" style={{ margin: "10px" }}>
        <Title titleFont="22px" title={post.postTitle} />
      </div>

      <div className="w3-center">
        {tags.map((tag) => (
          <Tag key={tag.tagId} color="light" tag={tag} />
        ))}
      </div>
      <div className="post-text">
        <PostShortText post={post} />
      </div>
      <div className="row" style={{ padding: "20px" }}>
        <div className="col" style={{ paddingBottom: "10px" }}>
          <Medal post={post} />
        </div>
        <div className="col">
          <PostUrl postId={postId} />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
