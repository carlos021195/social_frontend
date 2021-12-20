//pass post id as props and get the comments for the post and display
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Comment({ comment }) {
  
  const [like, setLike] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, token } = useContext(AuthContext);
  const headers = { headers: {"authorization" : `Bearer ${token}`} };

  useEffect(() => {
    setIsLiked(comment.likes.includes(currentUser._id));
  }, [currentUser._id, comment.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://comp586api.herokuapp.com/api/users?userId=${comment.userId}`, headers
      );
      setUser(res.data);
    };
    fetchUser();
  }, [comment.userId]);

  const likeHandler = () => {
    try {
      axios.put("https://comp586api.herokuapp.com/api/comments/" + comment._id + "/like", {
        userId: currentUser._id,
      },
      headers);
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  console.log(comment);
  return (
    <div>
      {comment.desc}
    </div>
  );
}
