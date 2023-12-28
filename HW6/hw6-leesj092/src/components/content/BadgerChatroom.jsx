import React, { useContext, useEffect, useRef, useState } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Col, Row, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {
  const [messages, setMessages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
  const titleVal = useRef();
  const contentVal = useRef();

  const loadMessages = () => {
    fetch(
      `https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${activePage}`,
      {
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(loadMessages, [props, activePage]);
  useEffect(() => {
    const login = sessionStorage.getItem("loginStatus");
    if (login !== null) {
      setLoginStatus(JSON.parse(login));
    }
  }, []);

  const handlePost = () => {
    if (titleVal == "" || contentVal == "") {
      alert("You must provide both a title and content!");
    } else {
      fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: titleVal.current.value,
          content: contentVal.current.value,
        }),
      }).then((res) => {
        if (res.status == 200) {
          alert("Successfully posted!");
          titleVal.current.value = "";
          contentVal.current.value = "";
          loadMessages();
          return res.json();
        }
      });
    }
  };

  const handleDelete = (postID) => {
    fetch(`https://cs571.org/api/f23/hw6/messages?id=${postID}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        alert("Successfully deleted the post!");
        loadMessages();
        return res.json();
      }
    });
  };

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {loginStatus !== true ? (
        <p>You must be logged in to post!</p>
      ) : (
        <>
          <Form.Label htmlFor="title">Post Title</Form.Label>
          <Form.Control id="title" ref={titleVal}></Form.Control>
          <Form.Label htmlFor="content">Post Content</Form.Label>
          <Form.Control id="content" ref={contentVal}></Form.Control>
          <br />
          <Button onClick={handlePost}>Create Post</Button>
        </>
      )}
      <hr />
      {messages.length > 0 ? (
        <>
          <Container>
            <Row>
              {messages.map((message) => {
                return (
                  <Col key={message.id} xs={12} md={6} lg={4} xl={3}>
                    <BadgerMessage
                      id={message.id}
                      title={message.title}
                      poster={message.poster}
                      content={message.content}
                      created={message.created}
                      handleDelete={handleDelete}
                    ></BadgerMessage>
                  </Col>
                );
              })}
            </Row>
          </Container>
          <br />
        </>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
      <Container>
        <Pagination>
          {[1, 2, 3, 4].map((page) => {
            return (
              <Pagination.Item
                key={page}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              >
                {page}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Container>
    </>
  );
}
