import React from "react";
import {
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { fetchBookList } from "../actions/Book";
import List from "../components/List";

class BookList extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    // console.log(token);
    this.props.fetchBookList(token);
  }

  render() {
    // console.log("this.props from BookList ---->", this.props);
    const { loading, list, navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {!loading && list && (
          <FlatList
            data={list}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <List
                title={item.title}
                author={item.author}
                text={item.text}
                navigation={navigation}
              />
            )}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
  },
});

const mapStateToProps = (state) => {
  const { list, loading, error } = state;
  return {
    list,
    loading,
    error,
  };
};

export default connect(mapStateToProps, { fetchBookList })(BookList);
