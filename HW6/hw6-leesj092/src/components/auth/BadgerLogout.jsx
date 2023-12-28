import React, { useEffect, useContext } from "react";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogout() {
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw6/logout", {
      method: "POST",
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        setLoginStatus(false);
        sessionStorage.setItem("loginStatus", "false");
        sessionStorage.setItem("username", "");
      });
  });

  return (
    <>
      <h1>Logout</h1>
      <p>You have been successfully logged out.</p>
    </>
  );
}
