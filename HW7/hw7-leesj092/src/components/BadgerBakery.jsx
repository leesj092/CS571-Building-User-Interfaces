import { Alert, Button, Text, View } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import { useEffect, useState } from "react";

export default function BadgerBakery() {
  const [goods, setGoods] = useState({});
  const [keys, setKeys] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw7/goods", {
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGoods(data);
        setKeys(Object.keys(data));
      });
  }, []);

  const currKey = keys.length > 0 ? keys[currIndex] : null;
  const currGood = Object.keys(goods).length > 0 ? goods[currKey] : null;

  const handlePrevious = () => {
    setCurrIndex((index) => index - 1);
  };

  const handleNext = () => {
    setCurrIndex((index) => index + 1);
  };

  const [basket, setBasket] = useState({});
  const [price, setPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const addBasket = (key) => {
    setBasket((currBasket) => {
      const newBasket = { ...currBasket };
      const currQuantity = newBasket[key] || 0;

      newBasket[key] = currQuantity + 1;
      setPrice((price) => price + goods[key].price);
      setTotalItems((count) => count + 1);

      return newBasket;
    });
  };

  const removeBasket = (key) => {
    setBasket((currBasket) => {
      const newBasket = { ...currBasket };
      const currQuantity = newBasket[key];
      newBasket[key] = currQuantity - 1;
      setPrice((price) => price - goods[key].price);
      setTotalItems((count) => count - 1);

      return newBasket;
    });
  };

  const handleOrder = () => {
    Alert.alert(
      "Order Confirmed!",
      `Your order contains ${totalItems} items and would have cost $${price.toFixed(
        2
      )}!`
    );
    setBasket({});
    setPrice(0);
    setCurrIndex(0);
    setTotalItems(0);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginTop: 200, fontWeight: "bold" }}>
        Welcome to Badger Bakery!
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          disabled={currIndex === 0}
        ></Button>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currIndex === Object.keys(goods).length - 1}
        ></Button>
      </View>

      {currGood && (
        <BadgerBakedGood
          {...currGood}
          remove={() => removeBasket(currKey)}
          add={() => addBasket(currKey)}
          quantity={basket[currKey] || 0}
          totalPrice={price}
        ></BadgerBakedGood>
      )}

      <View style={{ marginBottom: 200 }}>
        <Button
          title="Place Order"
          onPress={handleOrder}
          disabled={totalItems === 0}
        ></Button>
      </View>
    </View>
  );
}
