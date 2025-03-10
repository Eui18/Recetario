import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from "react-native";
import dataListRecet from "../mocks/ListRecets.json";
import { useNavigation } from "@react-navigation/native";

export default function ListRecet() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recetas</Text>
        <Text style={styles.headerSubtitle}>Explora nuestra colección</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.containerList}>
          {dataListRecet.map((receta, index) => (
            <TouchableOpacity
              key={index}
              style={styles.containerCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Descriptions', { receta })}
            >
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.image} 
                  source={{ uri: receta.imagen }} 
                  resizeMode="cover"
                />
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryText}>{receta.categoria}</Text>
                </View>
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.textCard} numberOfLines={2}>{receta.nombre}</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.timeInfo}>{receta.tiempoPreparacion}</Text>
                  <Text style={styles.portionsInfo}>{receta.porciones}</Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <Text style={styles.viewMoreText}>Ver detalles</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  containerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    padding: 12,
  },
  containerCard: {
    width: cardWidth,
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 100, 124, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
  },
  textCard: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    height: 40,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeInfo: {
    fontSize: 12,
    color: '#888',
  },
  portionsInfo: {
    fontSize: 12,
    color: '#888',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#FF647C',
    fontSize: 12,
    fontWeight: '500',
  }
});