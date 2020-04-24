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
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-datepicker";
import { COUNTRY_LIST } from "../constants/country-list";
import config from "../../config";

const initState = {
  loading: false,
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  country: "",
  dob: "1970-01-01",
};
class Registration extends React.Component {
  state = {
    loading: false,
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    country: "",
    dob: "1970-01-01",
  };

  handleInput = (name) => (e) => {
    this.setState({ [name]: e.nativeEvent.text });
  };

  handleSubmit = async () => {
    // console.log("Registered", this.state);
    const { navigation } = this.props;
    this.setState({ loading: true });
    const {
      name,
      email,
      password,
      passwordConfirmation,
      country,
      dob,
    } = this.state;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      passwordConfirmation.length === 0 ||
      country.length === 0
    ) {
      return Alert.alert("Error", "All Fields Are Required");
    }

    const response = await fetch(`${config.api.url}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        country: country,
        dob: dob,
      }),
    })
      .then((res) => res.json())
      .then((json) => json);

    if (response.success) {
      // this.setState({name:"",password:"",passwordConfirmation:"",email:"",country:"", dob:"1970-01-01"});
      this.setState(initState);
      Alert.alert("Success", `Hi ${response.success.name} has been registered`);
      return navigation.navigate("Login");
    } else {
      this.setState({ loading: false });
      return Alert.alert(
        "Error",
        `Cannot register and might have duplicate entry or password not same`
      );
    }
  };
  render() {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      dob,
      loading,
    } = this.state;

    // console.log("country", JSON.stringify(countryList.country));
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
            <Text style={styles.header}>Registration</Text>
            <View>
              <TextInput
                placeholder="Name"
                style={styles.textInput}
                value={name}
                onChange={this.handleInput("name")}
              />
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
              <TextInput
                placeholder="Password Confirmation"
                style={styles.textInput}
                secureTextEntry={true}
                value={passwordConfirmation}
                onChange={this.handleInput("passwordConfirmation")}
              />
              <RNPickerSelect
                placeholder={{ label: "Select Country", value: null }}
                onValueChange={(value) => {
                  this.setState({ country: value });
                }}
                items={COUNTRY_LIST.country}
              />
              <View style={styles.datePicker}>
                <Text style={{ color: "#2196f3" }}>Date Of Birth: </Text>
                <DatePicker
                  style={{ width: 200 }}
                  date={dob}
                  mode="date"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => this.setState({ dob: date })}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button title="Submit" onPress={this.handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
export default Registration;

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
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#9e9e9e",
    borderBottomWidth: 1,
    marginBottom: 25,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
