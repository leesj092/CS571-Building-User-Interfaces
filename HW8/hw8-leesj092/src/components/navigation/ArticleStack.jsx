import BadgerArticleScreen from "../screens/BadgerArticleScreen";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function ArticleStack() {
  const ArticleStack = createNativeStackNavigator();

  return (
    <ArticleStack.Navigator>
      <ArticleStack.Screen
        name="News"
        component={BadgerNewsScreen}
        options={{ headerShown: true, title: "Articles" }}
      />
      <ArticleStack.Screen name="Article" component={BadgerArticleScreen} />
    </ArticleStack.Navigator>
  );
}

export default ArticleStack;
