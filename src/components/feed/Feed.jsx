import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username, getPosts, setPosts, posts }) {
  const { user, token } = useContext(AuthContext);
  const headers = { headers: {"authorization" : `Bearer ${token}`} };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("https://comp586api.herokuapp.com/api/posts/profile/" + username, headers)
        : await axios.get(
            "https://comp586api.herokuapp.com/api/posts/timeline/" + user._id, headers
          );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share getPosts={getPosts} />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
