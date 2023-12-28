import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {
  const usernameVal = useRef();
  const passVal = useRef();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

  const handleLogin = () => {
    if (usernameVal.current.value == "" || passVal.current.value == "") {
      alert("You must provide both a username and password!");
    } else {
      fetch("https://cs571.org/api/f23/hw6/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: usernameVal.current.value,
          password: passVal.current.value,
        }),
      })
        .then((res) => {
          if (res.status == 401) {
            alert("Incorrect username or password!");
          } else if (res.status == 200) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
          alert("Login Successful!");
          setLoginStatus(true);
          sessionStorage.setItem("loginStatus", "true");
          sessionStorage.setItem("username", usernameVal.current.value);
          navigate("/");
        });
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control id="username" ref={usernameVal}></Form.Control>
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control id="password" type="password" ref={passVal}></Form.Control>
      <br />
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
}
