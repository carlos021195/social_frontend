import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comments from "./Comments"

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, token } = useContext(AuthContext);
  const headers = { headers: {"authorization" : `Bearer ${token}`} }

  const getComments = async () => {
    const res = await axios.get(
      `https://comp586api.herokuapp.com/api/comments/all/`+ post._id, headers
    );
    setComments(res.data);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://comp586api.herokuapp.com/api/users?userId=${post.userId}`, headers
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `https://comp586api.herokuapp.com/api/comments/all/`+ post._id, headers
      );
      setComments(res.data);
    };
    fetchComments();
  }, [post._id]);

  const commentHandler = () => {
    setShowComments(!showComments);
  }

  const likeHandler = () => {
    try {
      axios.put("https://comp586api.herokuapp.com/api/posts/" + post._id + "/like", {
        userId: currentUser._id,
      },
      headers);
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  console.log(post.username)
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="https://img.icons8.com/external-sbts2018-blue-sbts2018/58/000000/external-like-social-media-basic-1-sbts2018-blue-sbts2018.png"
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src="https://img.icons8.com/color/48/000000/filled-like.png"
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span onClick={commentHandler} className="postCommentText">{comments.length} comments</span>
            <div>
              {showComments ? <Comments getComments={getComments} post={post} comments={comments}/> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
