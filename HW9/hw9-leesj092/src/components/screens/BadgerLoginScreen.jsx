import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";

function BadgerLoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 20 }}>BadgerChat Login</Text>
      <Text style={{ marginBottom: 10 }}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      <Text style={{ marginBottom: 10 }}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      ></TextInput>
      <Button
        color="crimson"
        title="Login"
        onPress={() => {
          props.handleLogin(username, password);
        }}
      />
      <Text style={{ marginTop: 10 }}>New Here?</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          color="grey"
          title="Signup"
          onPress={() => props.setIsRegistering(true)}
        />
        <Button
          color="grey"
          title="Continue as guest"
          onPress={() => props.setIsGuest(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 35,
    width: 200,
    marginBottom: 10,
    padding: 10,
  },
});

export default BadgerLoginScreen;
