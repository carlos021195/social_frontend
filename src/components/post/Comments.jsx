//pass post id as props and get the comments for the post and display
import "./post.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "./Input"

export default function Comments({ post, comments, getComments }) {
    const { user: currentUser, token } = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const headers = { headers: {"authorization" : `Bearer ${token}`} }

    const submitHandler = async (e) => {
        e.preventDefault();
        const newComment = {
            userId: currentUser._id,
            desc: desc,
            postId: post._id,
        };
        try {
            await axios.post("https://comp586api.herokuapp.com/api/comments/", newComment, headers);
            getComments();
        } catch (err) {
            console.log(err);
        }
        setDesc('');
    }

    const handleChange= (e) => {
        setDesc(e.target.value);
    }

  const commentList = comments.map(comment => <div>{comment.desc}</div>);
  return (
    <div>
        {commentList}
        <form onSubmit={submitHandler}>
        <label>
            <Input type={"text"} desc={desc} handleChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
