import React from "react";
import Login from "./src/Pages/Login"
import Home from "./src/Pages/Home"
import Descriptions from "./src/Pages/Descriptions";
import {createStaticNavigation} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ListRecet from "./src/Pages/ListRecet";


const enrutador = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false
      }
    },

    ListRecet: {
      screen: ListRecet
    },

    Descriptions: {
      screen: Descriptions
    }
    
  }
})

const Navegation = createStaticNavigation(enrutador);

export default function App() {
 

  return (
   <>
      <Navegation></Navegation>
   </>
  );
}



