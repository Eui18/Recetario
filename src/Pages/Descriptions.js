import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Descriptions() {
   
    const route = useRoute();

    const { receta } = route.params || {};
    

    if (!receta) {
        return (
            <View style={styles.container}>
                <Text>No se encontraron datos de la receta</Text>
            </View>
        );
    }
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image 
                    style={styles.image} 
                    source={{ uri: receta.imagen }} 
                />
                
                <Text style={styles.title}>{receta.nombre}</Text>
                <Text style={styles.description}>{receta.descripcion}</Text>
                
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Tiempo de preparación:</Text>
                        <Text style={styles.infoValue}>{receta.tiempoPreparacion}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Tiempo de cocción:</Text>
                        <Text style={styles.infoValue}>{receta.tiempoCoccion}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Porciones:</Text>
                        <Text style={styles.infoValue}>{receta.porciones}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Categoría:</Text>
                        <Text style={styles.infoValue}>{receta.categoria}</Text>
                    </View>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredientes:</Text>
                    {receta.ingredientes.map((ingrediente, index) => (
                        <View key={index} style={styles.ingredientItem}>
                            <Text style={styles.ingredientName}>• {ingrediente.nombre}</Text>
                            <Text style={styles.ingredientQuantity}>{ingrediente.cantidad}</Text>
                        </View>
                    ))}
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preparación:</Text>
                    {receta.preparacion.map((paso, index) => (
                        <View key={index} style={styles.stepItem}>
                            <Text style={styles.stepNumber}>{index + 1}.</Text>
                            <Text style={styles.stepText}>{paso}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: '#333',
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#666',
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
    },
    infoItem: {
        width: '48%',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        color: '#333',
    },
    section: {
        marginBottom: 24,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    ingredientName: {
        fontSize: 16,
        flex: 1,
    },
    ingredientQuantity: {
        fontSize: 16,
        color: '#666',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    stepNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#ff6b6b',
    },
    stepText: {
        fontSize: 16,
        flex: 1,
        lineHeight: 22,
    }
});