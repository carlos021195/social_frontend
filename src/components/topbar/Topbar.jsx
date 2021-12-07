import "./topbar.css";
import { Search, Person, Chat, Notifications, SettingsInputComponentTwoTone } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SearchResults from "./SearchResults";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [resultComponent, setResultComponent] = useState();
  const [searchResults, setSearchResults] = useState();

  const clear = () => {
    setSearchResults();
  }

  const handleChange = async (e) => {
    if (e.target.value.length>0){
      const res = await axios.get(
        "http://localhost:8800/api/users/" + e.target.value + "/search"
      );
      console.log(res.data);
      setSearchResults(<SearchResults onBlur={clear} className="search-results" results={res.data}/>);
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
          <span className="logo">MataHub</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
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
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
