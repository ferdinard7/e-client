import React, { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { stepLabelClasses } from "@mui/material";

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
&:disabled {
  color: green;
  cursor: not-allowed;
}
`

const Error = styled.span`
color: red;
`
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector((state) => state.user);

  function handleClick(e) {
    e.preventDefault();
    login(dispatch, {username, password})
    setPassword("");
    setUsername("");
  }

    return (
        <div className="login-container">
        <div className="login-wrapper">
          <h1 className="register-title">SIGN IN</h1>
          <form className="login-form">
          <input className="register-input login-input" placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <input className="register-input login-input" placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <Button onClick={handleClick} disabled={isFetching}>LOG IN</Button>
          {error && <Error>Something went wrong...</Error>}
          <a  className="link" href=""> 
          DO NOT REMEMBER YOUR PASSWORD?</a>
          <a className="link" href="/register">CREATE A NEW ACCOUNT</a>
          </form>
        </div>
        </div>
    )
}

export default Login;