import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    const password1=document.getElementsByClassName('passwordInput2')[0];
    if (passwordAgain.current.value !== password.current.value) {
      alert("Passwords don't match!");
    } 
    else if (!password.current.value.match("^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$")) {
      alert("Password must contain at least one letter and number")
    }
    else {
      const user = {
        username: username.current.value,
        email: email.current.value.toLowerCase(),
        password: password.current.value,
      };
      try {
        const res = await axios.post("https://comp586api.herokuapp.com/api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
        alert("username or email already taken");
      }
    }
  };

  const handleLoginClick = (e) => {
    history.push("/login");
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialMedia</h3>
          <span className="loginDesc">
            COMP 586
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput passwordInput1"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput passwordInput2"
              type="password"
              minLength="6"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
          <button onClick={handleLoginClick} className="loginRegisterButton">Log into Account</button>
        </div>
      </div>
    </div>
  );
}
