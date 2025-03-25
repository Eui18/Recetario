import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Modal
} from "react-native";
import dataListRecet from "../mocks/ListRecets.json";
import { useNavigation } from "@react-navigation/native";

export default function ListRecet() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showSelectedModal, setShowSelectedModal] = useState(false);

  const filteredRecetas = dataListRecet.filter((receta) =>
    receta.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => {
      const lowerIngredient = ingredient.toLowerCase();
      if (prev.includes(lowerIngredient)) {
        return prev.filter(ing => ing !== lowerIngredient);
      } else {
        return [...prev, lowerIngredient];
      }
    });
  };

 // Cambia la función handleCardPress para NO seleccionar automáticamente todos los ingredientes
const handleCardPress = (receta) => {
  navigation.navigate('Descriptions', { 
    receta,
    selectedIngredients: selectedIngredients // Solo pasamos los ya seleccionados
  });
};

  const handleViewSelected = () => {
    setShowSelectedModal(true);
  };

  const handleCloseModal = () => {
    setShowSelectedModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Recetas</Text>
          <TouchableOpacity 
            style={[
              styles.viewSelectedButton,
              selectedIngredients.length === 0 && styles.disabledButton
            ]}
            onPress={handleViewSelected}
            disabled={selectedIngredients.length === 0}
          >
            <Text style={styles.viewSelectedButtonText}>
              Seleccionados ({selectedIngredients.length})
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Explora nuestra colección</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar receta..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.containerList}>
          {filteredRecetas.length > 0 ? (
            filteredRecetas.map((receta, index) => (
              <TouchableOpacity
                key={index}
                style={styles.containerCard}
                activeOpacity={0.9}
                onPress={() => handleCardPress(receta)}
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
            ))
          ) : (
            <Text style={styles.noResults}>No se encontraron recetas</Text>
          )}
        </View>
      </ScrollView>

      {/* Modal para ver ingredientes seleccionados */}
      <Modal
        visible={showSelectedModal}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Ingredientes Seleccionados</Text>
          
          <ScrollView style={styles.modalScroll}>
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((ingredient, index) => (
                <View key={index} style={styles.modalIngredientItem}>
                  <Text style={styles.modalIngredientName}>
                    • {ingredient}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSelectedText}>No hay ingredientes seleccionados</Text>
            )}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.closeModalButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeModalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  viewSelectedButton: {
    backgroundColor: '#851736',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewSelectedButtonText: {
    color: 'white',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
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
    backgroundColor: 'rgba(143, 0, 21, 0.9)',
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
    backgroundColor: '#851736',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
  },
  modalIngredientItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  modalIngredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noSelectedText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  closeModalButton: {
    backgroundColor: '#851736',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
