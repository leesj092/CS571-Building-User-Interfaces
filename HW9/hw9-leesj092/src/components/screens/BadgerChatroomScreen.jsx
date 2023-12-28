import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from "expo-secure-store";

function BadgerChatroomScreen(props) {
  const [messages, setMessages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [renderTime, setRenderTime] = useState(Date.now());
  const [username, setUsername] = useState("");

  const handlePrev = () => {
    if (activePage > 1) {
      setActivePage((current) => current - 1);
    }
  };

  const handleNext = () => {
    if (activePage < 4) {
      setActivePage((current) => current + 1);
    }
  };

  const handlePost = async () => {
    const token = await SecureStore.getItemAsync("JWT_TOKEN");

    if (token) {
      fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
        method: "POST",
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: body,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setModalVisible(false);
          if (data["msg"] === "Successfully posted message!") {
            Alert.alert(
              "Succesfully posted!",
              "Your message was successfully posted!"
            );
            setTitle("");
            setBody("");
            setRenderTime(Date.now());
            setActivePage(1);
          } else {
            Alert.alert("Post failed!", data["msg"]);
          }
        });
    }
  };

  const handleDelete = async (messageID) => {
    const token = await SecureStore.getItemAsync("JWT_TOKEN");

    if (token) {
      fetch(`https://cs571.org/api/f23/hw9/messages?id=${messageID}`, {
        method: "DELETE",
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["msg"] === "Successfully deleted message!") {
            Alert.alert(
              "Succesfully deleted!",
              "Your message was successfully deleted!"
            );
            setRenderTime(Date.now());
            setActivePage(1);
          } else {
            Alert.alert("Delete failed!", data["msg"]);
          }
        });
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync("Username").then(setUsername);
    fetch(
      `https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${activePage}`,
      {
        method: "GET",
        headers: {
          "X-CS571-ID":
            "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMessages(data["messages"]);
      });
  }, [activePage, renderTime]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 25, marginBottom: 10 }}>
              Create a Post
            </Text>
            <Text style={{ marginBottom: 10 }}>Title</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
            ></TextInput>
            <Text style={{ marginBottom: 10 }}>Body</Text>
            <TextInput
              style={styles.bodyInput}
              value={body}
              onChangeText={setBody}
            ></TextInput>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Create Post"
                onPress={handlePost}
                disabled={title === "" || body === ""}
              ></Button>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
              ></Button>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={{ flex: 1 }}>
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <BadgerChatMessage
                key={message.id}
                {...message}
                username={username}
                handleDelete={handleDelete}
              ></BadgerChatMessage>
            );
          })
        ) : (
          <Text
            style={{
              justifyContent: "center",
              fontSize: 35,
              alignItems: "center",
              marginTop: 50,
            }}
          >
            There's nothing here!
          </Text>
        )}
        <View style={styles.bottomContainer}>
          <Text style={{ marginTop: 10 }}>
            You are on page {activePage} of 4.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Previous Page"
              onPress={handlePrev}
              disabled={activePage === 1}
            ></Button>
            <Button
              title="Next Page"
              onPress={handleNext}
              disabled={activePage === 4}
            ></Button>
          </View>
          <Button
            title="Add Post"
            onPress={() => setModalVisible(true)}
            disabled={props.isGuest === true}
          ></Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainer: {
    marginTop: 10,
    borderTopWidth: 2,
    borderColor: "black",
    alignItems: "center",
    paddingBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 35,
    width: 200,
    marginBottom: 10,
    padding: 10,
  },
  bodyInput: {
    borderColor: "black",
    borderWidth: 1,
    height: 80,
    width: 200,
    marginBottom: 10,
    padding: 10,
  },
});

export default BadgerChatroomScreen;
