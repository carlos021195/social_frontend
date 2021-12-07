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
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(comment.likes.includes(currentUser._id));
  }, [currentUser._id, comment.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/users?userId=${comment.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [comment.userId]);

  const likeHandler = () => {
    try {
      axios.put("http://localhost:8800/api/comments/" + comment._id + "/like", {
        userId: currentUser._id,
      });
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
  // return (
  //   <div className="comment">
  //     <div className="commentWrapper">
  //       <div className="commentTop">
  //         <div className="commentTopLeft">
  //           <Link to={`/profile/${user.username}`}>
  //             <img
  //               className="postProfileImg"
  //               src={
  //                 user.profilePicture
  //                   ? PF + user.profilePicture
  //                   : PF + "person/noAvatar.png"
  //               }
  //               alt=""
  //             />
  //           </Link>
  //           <span className="commentUsername">{user.username}</span>
  //           <span className="commentDate">{format(comment.createdAt)}</span>
  //         </div>
  //       </div>
  //       <div className="commentCenter">
  //         <span className="commentText">{comment?.desc}</span>
  //         <img className="commentImg" src={PF + comment.img} alt="" />
  //       </div>
  //       <div className="commentBottom">
  //         <div className="commentBottomLeft">
  //           <img
  //             className="likeIcon"
  //             src="https://img.icons8.com/color/48/000000/filled-like.png"
  //             onClick={likeHandler}
  //             alt=""
  //           />
  //           <span className="commentLikeCounter">{like} people like it</span>
  //         </div>
  //         {/* might need to remove */}
  //         <div className="commentBottomRight">
  //           <span className="commentCommentText">{post.comment.length} comment</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
