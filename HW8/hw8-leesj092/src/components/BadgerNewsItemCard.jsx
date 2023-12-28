import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-web";

function BadgerNewsItemCard(props) {
  return (
    <Pressable onPress={props.handlePress}>
      <View style={[styles.card, props.style]}>{props.children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 13,
    margin: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    alignItems: "center",
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default BadgerNewsItemCard;
