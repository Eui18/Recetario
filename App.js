import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importar los componentes
import Home from "./src/Pages/Home";
import FormularioRegistro from "./src/Pages/FormularioRegistro";
import ListRecet from "./src/Pages/ListRecet";
import Descriptions from "./src/Pages/Descriptions";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="FormularioRegistro" component={FormularioRegistro} options={{ headerShown: false }} />
        <Stack.Screen name="ListRecet" component={ListRecet} />
        <Stack.Screen name="Descriptions" component={Descriptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}