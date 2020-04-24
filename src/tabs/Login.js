import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import config from "../../config";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };

  handleInput = (name) => (e) => {
    this.setState({ [name]: e.nativeEvent.text });
  };

  handleLogin = async () => {
    // console.log(this.props);
    this.setState({ loading: true });
    const { navigation } = this.props;
    const { email, password } = this.state;
    if (email.length === 0 || password.length === 0) {
      return Alert.alert("Error", "Email or Password Is Empty");
    }
    const response = await fetch(`${config.api.url}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => json);

    // console.log(response);
    if (response.success) {
      try {
        await AsyncStorage.setItem("token", response.success.token);
      } catch (e) {
        console.error(e);
      }
      this.setState({ loading: false });
      return navigation.navigate("BookList");
    } else {
      this.setState({ loading: false });
      return Alert.alert("Error", "Wrong Email or Password");
    }
  };
  render() {
    const { email, password, loading } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Login</Text>
            <View>
              <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={styles.textInput}
                value={email}
                onChange={this.handleInput("email")}
              />
              <TextInput
                placeholder="Password"
                style={styles.textInput}
                secureTextEntry={true}
                value={password}
                onChange={this.handleInput("password")}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button title="Login" onPress={this.handleLogin} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 40,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 40,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
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
