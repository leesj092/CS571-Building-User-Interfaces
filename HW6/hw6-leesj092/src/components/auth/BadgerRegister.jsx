import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function BadgerRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passRep, setPassRep] = useState("");

  const handleRegister = () => {
    if (username == "" || password == "") {
      alert("You must provide both a username and password!");
    } else if (password != passRep) {
      alert("Your passwords do not match!");
    }

    fetch("https://cs571.org/api/f23/hw6/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.status == 409) {
          alert("That username has already been taken!");
        } else if (res.status == 200) {
          alert("You have been successfully registered!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        id="username"
      ></Form.Control>
      <br />
      <Form.Label htmlFor="password">Password</Form.Label>
      <Form.Control
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="password"
      ></Form.Control>
      <br />
      <Form.Label htmlFor="passRep">Repeat Password</Form.Label>
      <Form.Control
        value={passRep}
        type="password"
        onChange={(e) => setPassRep(e.target.value)}
        id="passRep"
      ></Form.Control>
      <br />
      <Button onClick={handleRegister}>Register</Button>
    </>
  );
}
