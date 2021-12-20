import "./share.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share({getPosts}) {
  const { user, token } = useContext(AuthContext);
  const [desc,setDesc] = useState('');
  const headers = { headers: {"authorization" : `Bearer ${token}`} };

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc
    };
    try {
      await axios.post("https://comp586api.herokuapp.com/api/posts", newPost, headers);
    } catch (err) {}
    getPosts();
    setDesc("");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            value={desc}
            onChange={handleChange}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
