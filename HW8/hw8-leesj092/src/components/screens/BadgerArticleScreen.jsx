import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Animated,
  Pressable,
  Linking,
} from "react-native";

export default function BadgerArticleScreen(props) {
  const details = props.route.params;
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const fadeRef = useRef(new Animated.Value(0));

  useEffect(() => {
    fetch(`https://cs571.org/api/f23/hw8/article?id=${details.fullArticleId}`, {
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
        Animated.timing(fadeRef.current, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start();
      });
  }, []);

  return (
    <ScrollView>
      <Image
        style={{
          height: 300,
          width: Math.round(Dimensions.get("window").width),
        }}
        source={{
          uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${details.img}`,
        }}
      ></Image>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        {details.title}
      </Text>

      {loading ? (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text>Your content is loading...</Text>
        </View>
      ) : (
        <Animated.View style={{ opacity: fadeRef.current }}>
          <Text style={{ marginBottom: 20, fontStyle: "italic" }}>
            By {article.author} on {article.posted}
          </Text>
          {article.body &&
            article.body.map((paragraph, index) => (
              <Text key={index} style={{ marginBottom: 10 }}>
                {paragraph}
              </Text>
            ))}
          <Pressable onPress={() => Linking.openURL(article.url)}>
            <Text style={{ marginTop: 20, marginBottom: 20, color: "blue" }}>
              Read full article here.
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </ScrollView>
  );
}
