import React from "react";
import Home from "./src/views/Home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import ListRecet from "./src/views/ListRecet";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: Home,
    ListRecet: ListRecet,
  }
})

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <>
      <Navigation/>
    </>
  );
}
