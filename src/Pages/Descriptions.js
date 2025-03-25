import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Modal
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function Descriptions() {
  const route = useRoute();
  const navigation = useNavigation();
  const { receta, selectedIngredients: initialSelected = [] } = route.params || {};
  
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState([]);
  const [showSelectedModal, setShowSelectedModal] = useState(false);

  useEffect(() => {
    // Solo inicializamos con los ingredientes previamente seleccionados
    // No agregamos automáticamente los ingredientes de la receta
    setLocalSelectedIngredients([...initialSelected]);
  }, [initialSelected]);

  const toggleIngredient = (ingredientName) => {
    const lowerIngredient = ingredientName.toLowerCase();
    setLocalSelectedIngredients(prev => 
      prev.includes(lowerIngredient)
        ? prev.filter(ing => ing !== lowerIngredient)
        : [...prev, lowerIngredient]
    );
  };

  const selectAllIngredients = () => {
    const recipeIngredients = receta.ingredientes.map(ing => ing.nombre.toLowerCase());
    setLocalSelectedIngredients([...new Set([...localSelectedIngredients, ...recipeIngredients])]);
  };

  const unselectAllIngredients = () => {
    const recipeIngredients = receta.ingredientes.map(ing => ing.nombre.toLowerCase());
    setLocalSelectedIngredients(prev => 
      prev.filter(ing => !recipeIngredients.includes(ing))
    );
  };

  const handleViewSelected = () => {
    setShowSelectedModal(true);
  };

  const handleCloseModal = () => {
    setShowSelectedModal(false);
  };

  if (!receta) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron datos de la receta</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
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
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ingredientes:</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={selectAllIngredients}
                >
                  <Text style={styles.selectButtonText}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unselectButton}
                  onPress={unselectAllIngredients}
                >
                  <Text style={styles.unselectButtonText}>Ninguno</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {receta.ingredientes.map((ingrediente, index) => {
              const isSelected = localSelectedIngredients.includes(ingrediente.nombre.toLowerCase());
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.ingredientItem,
                    isSelected && styles.selectedIngredientItem
                  ]}
                  onPress={() => toggleIngredient(ingrediente.nombre)}
                >
                  <Text style={[
                    styles.ingredientName,
                    isSelected && styles.selectedIngredientText
                  ]}>
                    • {ingrediente.nombre}
                  </Text>
                  <Text style={[
                    styles.ingredientQuantity,
                    isSelected && styles.selectedIngredientText
                  ]}>
                    {ingrediente.cantidad}
                  </Text>
                </TouchableOpacity>
              );
            })}
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

      {/* Floating button for selected ingredients */}
      {localSelectedIngredients.length > 0 && (
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={handleViewSelected}
        >
          <Text style={styles.floatingButtonText}>
            Seleccionados ({localSelectedIngredients.length})
          </Text>
        </TouchableOpacity>
      )}

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
            {localSelectedIngredients.map((ingredient, index) => (
              <View key={index} style={styles.modalIngredientItem}>
                <Text style={styles.modalIngredientName}>
                  • {ingredient}
                </Text>
              </View>
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.closeModalButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeModalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flex: 1,
  },
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  selectButton: {
    backgroundColor: '#851736',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  unselectButton: {
    backgroundColor: '#cccccc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectButtonText: {
    color: 'white',
    fontSize: 12,
  },
  unselectButtonText: {
    color: '#333',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
  },
  selectedIngredientItem: {
    backgroundColor: '#851736',
    borderRadius: 4,
  },
  ingredientName: {
    fontSize: 16,
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
  },
  selectedIngredientText: {
    color: '#fff',
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
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#851736',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
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
