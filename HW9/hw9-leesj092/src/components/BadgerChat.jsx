import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";
import BadgerChatroomScreen from "./screens/BadgerChatroomScreen";
import BadgerRegisterScreen from "./screens/BadgerRegisterScreen";
import BadgerLoginScreen from "./screens/BadgerLoginScreen";
import BadgerLandingScreen from "./screens/BadgerLandingScreen";
import BadgerLogoutScreen from "./screens/BadgerLogoutScreen";
import BadgerConversionScreen from "./screens/BadgerConversionScreen";

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
    })
      .then((res) => res.json())
      .then((data) => setChatrooms(data));
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/api/f23/hw9/login", {
      method: "POST",
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
        return res.json();
      })
      .then((data) => {
        if (data["msg"] === "Successfully authenticated.") {
          Alert.alert("Login Successful", "Success!");
          SecureStore.setItemAsync("JWT_TOKEN", data["token"]);
          SecureStore.setItemAsync("Username", data["user"]["username"]);
          setIsLoggedIn(true);
        } else {
          Alert.alert("Login Failed", data["msg"]);
        }
      });
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/api/f23/hw9/register", {
      method: "POST",
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
        return res.json();
      })
      .then((data) => {
        if (data["msg"] === "Successfully authenticated.") {
          Alert.alert("Signup Successful", "Success!");
          SecureStore.setItemAsync("JWT_TOKEN", data["token"]);
          SecureStore.setItemAsync("Username", data["user"]["username"]);
          setIsLoggedIn(true);
          setIsRegistering(false);
        } else {
          Alert.alert("Signup Failed", data["msg"]);
        }
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleConversion = () => {
    setIsGuest(false);
    setIsRegistering(true);
  };

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map((chatroom) => {
            return (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            );
          })}
          <ChatDrawer.Screen name="Logout">
            {(props) => (
              <BadgerLogoutScreen {...props} handleLogout={handleLogout} />
            )}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else if (isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map((chatroom) => {
            return (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => (
                  <BadgerChatroomScreen name={chatroom} isGuest={true} />
                )}
              </ChatDrawer.Screen>
            );
          })}
          <ChatDrawer.Screen name="Signup">
            {(props) => (
              <BadgerConversionScreen
                {...props}
                handleConversion={handleConversion}
              />
            )}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <BadgerLoginScreen
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        setIsGuest={setIsGuest}
      />
    );
  }
}
