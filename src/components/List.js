import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function List({ title, author, text, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name : {title}</Text>
      <View style={styles.bottomView}>
        <Text style={styles.author}>Author : {author}</Text>
        <Ionicons
          name="ios-information-circle"
          color="white"
          size={20}
          onPress={() =>
            navigation.navigate("BookDetail", {
              title: title,
              author: author,
              text: text,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64b5f6",
    marginBottom: 5,
    padding: 5,
  },
  title: {
    fontSize: 18,
    color: "white",
    marginBottom: 5,
  },
  bottomView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  author: {
    fontSize: 18,
    color: "white",
    fontStyle: "italic",
  },
});
