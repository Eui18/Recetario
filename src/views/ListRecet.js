import { View, Text, StyleSheet } from "react-native";

export default function ListRecet() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Lista de recetas</Text>
            <Text style={styles.subtitle}>urrrrrrrrrrrfvfeacf</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: "#1e213d",
    },
    title: {
        fontSize: 23,
        fontWeight: "bold",
        color: "white",
    },
    subtitle:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});

