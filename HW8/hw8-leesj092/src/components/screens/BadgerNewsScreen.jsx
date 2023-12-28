import { Text, View, Image, ScrollView } from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BadgerPreferenceContext } from "../BadgerPreferenceContext";

function BadgerNewsScreen(props) {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();
  const { setTags, preferences } = useContext(BadgerPreferenceContext);

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw8/articles", {
      headers: {
        "X-CS571-ID":
          "bid_0337ae917ebffe93a9485f3344038ad2dcefe1c62f948f76c81eeb8f3b418d6c",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        const uniqueTags = data.reduce((arr, article) => {
          article.tags.forEach((tag) => {
            if (arr.indexOf(tag) === -1) {
              arr.push(tag);
            }
          });
          return arr;
        }, []);
        setTags(uniqueTags);
      });
  }, []);

  const handlePress = (article) => {
    navigation.push("Article", { ...article });
  };

  const filtered = articles.filter((article) => {
    return article.tags.every((tag) => preferences[tag] === true);
  });

  return (
    <ScrollView>
      {filtered.length > 0 ? (
        filtered.map((article) => (
          <View
            key={article.id}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BadgerNewsItemCard
              handlePress={() => handlePress(article)}
              {...article}
            >
              <Image
                style={{
                  height: 200,
                  width: 350,
                }}
                source={{
                  uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}`,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {article.title}
              </Text>
            </BadgerNewsItemCard>
          </View>
        ))
      ) : (
        <View>
          <Text style={{ fontSize: 50, fontWeight: "bold" }}>
            No articles available based on your preferences.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

export default BadgerNewsScreen;
