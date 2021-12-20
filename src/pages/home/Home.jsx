import React, { useContext, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const{user, token} = useContext(AuthContext);
  const headers = { headers: {"authorization" : `Bearer ${token}`} }

  const getPosts = async () => {
    const res = user.username
        ? await axios.get("https://comp586api.herokuapp.com/api/posts/profile/" + user.username, headers)
        : await axios.get(
            "https://comp586api.herokuapp.com/api/posts/timeline/" + user._id, headers
          );
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
    console.log(posts)
  };

  return [
    <Topbar getPosts={getPosts}/>,
    <div className="homeContainer">
      <Feed setPosts={setPosts} posts={posts} getPosts={getPosts}/>
    </div>,
  ];
}
