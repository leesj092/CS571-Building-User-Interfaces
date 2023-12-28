import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerRegisterScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, marginBottom: 20 }}>Join BadgerChat!</Text>
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
      <Text style={{ marginBottom: 10 }}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPass}
        onChangeText={setConfirmPass}
        secureTextEntry={true}
      ></TextInput>
      {password === "" && (
        <Text style={{ color: "crimson" }}>Please enter a password</Text>
      )}
      {password !== "" && password !== confirmPass && (
        <Text style={{ color: "crimson" }}>Passwords do not match!</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          color="crimson"
          title="Signup"
          disabled={password === "" || password !== confirmPass}
          onPress={() => props.handleSignup(username, password)}
        />
        <Button
          color="grey"
          title="Nevermind!"
          onPress={() => props.setIsRegistering(false)}
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
  buttonContainer: {
    flexDirection: "row",
  },
});

export default BadgerRegisterScreen;
