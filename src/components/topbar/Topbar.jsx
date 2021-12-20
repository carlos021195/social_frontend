import React  from "react";
import "./topbar.css";
import { Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SearchResults from "./SearchResults";
import { logout } from "../../apiCalls";

export default function Topbar({getPosts}) {
  const { user, token } = useContext(AuthContext);
  const [resultComponent, setResultComponent] = useState();
  const [searchResults, setSearchResults] = useState();
  const headers = { headers: {"authorization" : `Bearer ${token}`} }
  const { dispatch } = useContext(AuthContext);

  const clear = () => {
    setSearchResults();
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    logout(dispatch);
  }

  const handleChange = async (e) => {
    if (e.target.value.length>0){
      const res = await axios.get(
        "https://comp586api.herokuapp.com/api/users/" + e.target.value + "/search", headers
      );
      console.log(res.data);
      setSearchResults(<SearchResults getPosts={getPosts} onBlur={clear} className="search-results" results={res.data}/>);
    }
    else {
      clear()
    }
    //Need to render results or no user found
  }

  useEffect(()=>{
    setResultComponent(searchResults)
  }, [resultComponent, searchResults])

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SocialMedia</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            data-testid="searchInput"
            onChange={handleChange}
            placeholder="Search for friends"
            className="searchInput"
          />
          <br />
          {resultComponent}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        </div>
        <div className="topbarIcons">
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </div>
  );
}
