import React from "react";
import Icon from "../assets/rosa.jpg"
import { StatusBar } from "expo-status-bar";
import {useNavigation} from "@react-navigation/native"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";


export default function Home() {

  const navegation = useNavigation();

  const handleButtonPress = () => {
    console.log("Botón presionado");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image source={Icon} style={styles.backgroundImage}  />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sweeten</Text>
        <Text style={styles.subtitle}>Sabores del mundo en tu cocina</Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={ () => navegation.navigate('ListRecet') } >
          <Text style={styles.buttonText}>Get in now</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#a11c55",
    padding: 20,
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#762146",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 300,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});