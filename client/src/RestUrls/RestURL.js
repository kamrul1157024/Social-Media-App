export const serverLink = "http://localhost:3080";

export const getCurrentServerURL = () => serverLink;

export const getPostById = (id) => `${serverLink}/api/post/${id}`;

export const getLogInURL = () => `${serverLink}/auth/authenticate`;

export const getRegisterURL = () => `${serverLink}/auth/register`;

export const getCurrentlyLoggeInUserUrl = () =>
  `${serverLink}/api/user/currentlyLoggedInUser`;

export const getMedalGiverURL = () => `${serverLink}/api/medal`;

export const getPostForPage = (pageNo) =>
  `${serverLink}/api/post/page/${pageNo}`;

export const getAllTagsURL = () => `${serverLink}/api/tag/allTags`;

export const getPostCreationURL = () => `${serverLink}/api/post`;

export const getCommentsForPostId = (id) =>
  `${serverLink}/api/comment/commentForType/POST/commentFor/${id}?page=0`;

export const getCommentRepliesByCommentId = (id) =>
  `${serverLink}/api/commentReply/comment/${id}`;

export const getCommentPostURL = () => `${serverLink}/api/comment`;

export const getCommentReplyPostURL = (commentId) => `${serverLink}/api/comment/replyTo/comment/${commentId}`;

export const getAllFollowedLoggedInUserURL = () =>
  `${serverLink}/api/follow/allFollowedUserId`;

export const getAddToFollowURL = () => `${serverLink}/api/follow/`;

export const getUserInfoURL = (userName) =>
  `${serverLink}/api/user/userName/${userName}`;

export const getUserPostURL = (userId, pageNo) =>
  `${serverLink}/api/user/${userId}/posts?pageNo=${pageNo}`;

export const getBookletURL = (bookletId) =>
  `${serverLink}/api/booklet?id=${bookletId}`;

export const getBookletPostURL = () => `${serverLink}/api/booklet`;

export const getBookletsByUserID = (userId) =>
  `${serverLink}/api/user/booklet?userId=${userId}`;
