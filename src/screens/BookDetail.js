import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

class BookDetail extends React.Component {
  render() {
    const { route } = this.props;
    const title = route.params.title;
    const author = route.params.author;
    const text = route.params.text;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>By {author}</Text>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    );
  }
}
export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64b5f6",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  author: {
    fontSize: 25,
    fontStyle: "italic",
    marginBottom: 10,
    color: "white",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "white",
  },
});
