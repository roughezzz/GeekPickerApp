import React from "react";
import { StyleSheet } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import bookReducer from "./src/reducers/Book";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import BookList from "./src/screens/BookList";
import BookDetail from "./src/screens/BookDetail";
import Login from "./src/tabs/Login";
import Registration from "./src/tabs/Registration";

const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(bookReducer);

export default class App extends React.Component {
  createMainStack = () => {
    return (
      <MaterialBottomTabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let iconName;
            if (route.name === "Login") {
              iconName = "ios-contact";
            } else if (route.name === "Registration") {
              iconName = "ios-add-circle-outline";
            }

            return <Ionicons name={iconName} color="white" size={24} />;
          },
        })}
      >
        <MaterialBottomTabs.Screen name="Login" component={Login} />
        <MaterialBottomTabs.Screen
          name="Registration"
          component={Registration}
        />
      </MaterialBottomTabs.Navigator>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              children={this.createMainStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="BookList" component={BookList} />
            <Stack.Screen name="BookDetail" component={BookDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
