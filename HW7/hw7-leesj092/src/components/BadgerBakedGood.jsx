import { Button, Image, Text, View } from "react-native";

export default function BadgerBakedGood(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{ uri: props.imgSrc }}
      ></Image>
      <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{props.name}</Text>
      <Text>${props.price}</Text>
      <Text>
        You can order{" "}
        {props.upperLimit === -1 ? "unlimited" : `up to ${props.upperLimit}`}{" "}
        {props.upperLimit === 1 ? "unit" : "units"}!
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="-"
          onPress={props.remove}
          disabled={props.quantity === 0}
        ></Button>

        <Text style={{ marginTop: 10, marginHorizontal: 10 }}>
          {props.quantity}
        </Text>

        <Button
          title="+"
          onPress={props.add}
          disabled={
            props.upperLimit !== -1 && props.quantity >= props.upperLimit
          }
        ></Button>
      </View>
      <Text>Order Total: ${props.totalPrice.toFixed(2)}</Text>
    </View>
  );
}
