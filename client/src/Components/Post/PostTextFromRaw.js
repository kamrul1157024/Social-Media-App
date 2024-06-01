export const postTextFromRaw = (post) => {
  const postTextJSON = JSON.parse(post.postText);
  let postText = "";
  let isTitle = true;
  let i = 0;
  postTextJSON.blocks.forEach((block) => {
    if (!isTitle && block.type != "code-block" && i < 100)
      postText += block.text;

    if (isTitle) isTitle = false;
    i++;
  });

  return postText;
};
