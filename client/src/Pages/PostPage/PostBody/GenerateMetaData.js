import { postTextFromRaw } from "../../../Components/Post/PostTextFromRaw";

/* Image Has to be picked From the post  */

const GenerateMetaData = (post) => {
  const getImageForThePost = (post) => {
    const postText = JSON.parse(post.postText);
  };

  let data = {
    title: "",
    description: "",
    image: "",
  };

  data.title = post.postTitle;
  data.description = postTextFromRaw(post);
  console.log(data);
  return data;
};

export default GenerateMetaData;
